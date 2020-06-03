import { PersistenceAdapter } from "ask-sdk-core";
import mysql from "mysql";
import { MYSQL_CONF } from "../../util/secrets";

const connection = mysql.createConnection({
  host: MYSQL_CONF.host,
  user: MYSQL_CONF.user,
  password: MYSQL_CONF.pass,
  database: MYSQL_CONF.db
});

connection.connect();

interface DisposableAdapter extends PersistenceAdapter {
  dispose(): void;
}

export const sqlAdapter: DisposableAdapter = {
  getAttributes(requestEnvelope) {
    return new Promise((resolve, reject) => {
      requestEnvelope.session.user.userId;
      connection.query(
        "SELECT data FROM persistent_attributes WHERE user_id = ?",
        [requestEnvelope.session.user.userId],
        function (err, rows, fields) {
          if (err) reject(err);
          else {
            try {
              if (rows.length) {
                const attributes = JSON.parse(rows[0].data || "{}");
                resolve(attributes);
              } else {
                resolve({});
              }
            } catch (err) {
              reject(err);
            }
          }
        });
    });
  },
  saveAttributes(requestEnvelope, attributes) {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(attributes);
      connection.query(
        "INSERT INTO persistent_attributes (user_id, data) VALUES(?, ?) ON DUPLICATE KEY UPDATE data = ?",
        [requestEnvelope.session.user.userId, json, json],
        function (err, rows, fields) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  deleteAttributes(requestEnvelope) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM persistent_attributes WHERE user_id=?",
        [requestEnvelope.session.user.userId],
        function (err, rows, fields) {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
  dispose() {
    if (connection && connection.state === "connected") {
      connection.end();
    }
  }
};
