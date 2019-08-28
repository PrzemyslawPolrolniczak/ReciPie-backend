const MongoClient = require("mongodb").MongoClient;

class DatabaseMiddleware {
  constructor(
    private url: string,
    private dbName: string,
    private collectionName: string
  ) {}

  private database: any;
  private collection: any;
  private connection: any;

  private async connect() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err: Error, client: any) => {
        if (err) {
          console.error("Error: ", err);
          reject(err);
        } else {
          this.connection = client;
          this.database = client.db(this.dbName);
          this.collection = this.database.collection(this.collectionName);
          resolve(client.db(this.dbName));
        }
      });
    });
  }

  private get(query: object) {
    return new Promise((resolve, reject) => {
      this.collection.find(query).toArray((err: Error, docs: any) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
  }

  private close() {
    this.connection.close();
    console.log("connection closed");
  }

  public makeQuery = async (query: object = {}) => {
    const response = await this.connect().then(() =>
      this.get(query).then(databaseResponse => {
        this.close();
        return databaseResponse;
      })
    );
    return response;
  };
}

export default DatabaseMiddleware;
