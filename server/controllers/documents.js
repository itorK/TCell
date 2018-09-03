"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256 = require("sha256");
const fs = require("fs");
const mariadb = require("mariadb");
const documents_sol_1 = require("./documents_sol");
const pool = mariadb.createPool({ host: 'localhost', user: 'admin', password: 'esmtechnology', database: 'test', connectionLimit: 5 });
exports.getDocuments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let conn;
        let rows;
        try {
            const userid = req.params.clientid;
            conn = yield pool.getConnection();
            rows = yield conn.query("SELECT 1 as val");
            console.log(rows); //[ {val: 1}, meta: ... ]
            //  const res = await conn.query("INSERT INTO transaction (trn_eth_id,trn_doc_id,trn_client_id) values (?, ?, ?)", [1, 2, userid]);
            //  console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
            rows = yield conn.query("SELECT * FROM transaction");
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn)
                conn.end();
        }
        ;
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getCountDocuments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let conn;
        let count;
        let rows;
        let returning = {};
        try {
            const userid = req.params.clientid;
            const start = req.body.start;
            const length = req.body.length;
            const searchWord = req.body.search.value;
            const searchColumn = req.body.search.value;
            const columns = req.body.search.columns;
            //foreach columns { warunek = warunek + ' AND ' + columns.data + ' = ' + columns.search.value }
            //dla samego searchWord
            //foreach columns { warunek = warunek + ' OR ' + columns.data + ' = ' + columns.search.value }
            conn = yield pool.getConnection();
            rows = yield conn.query("SELECT 1 as val");
            console.log(rows); //[ {val: 1}, meta: ... ]
            //  const res = await conn.query("INSERT INTO transaction (trn_eth_id,trn_doc_id,trn_client_id) values (?, ?, ?)", [1, 2, userid]);
            //  console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
            count = yield conn.query("SELECT count(*) as recordsTotal FROM transaction");
            rows = yield conn.query("SELECT * FROM transaction LIMIT ? , ?", [start, length]);
            returning = {
                recordsTotal: count[0].recordsTotal,
                draw: 0,
                recordsFiltered: count[0].recordsTotal,
                data: rows
            };
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn)
                conn.end();
        }
        ;
        res.status(200).send(returning);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        /*const pool = new pg.Pool(config);
        const client = await pool.connect();
        const docHash = req.params.hash;
        const {rows} = await client.query('SELECT * FROM documents WHERE doc_client_id = $1 and doc_hash = $2 order by doc_id desc', [req.params.clientid, docHash]);
        client.release();
        if (rows[0].doc_id > 0) {
            console.log(path.join(__dirname, '../../', rows[0].doc_path));

            let ethHash = await getEthHash(rows[0].doc_client_id , rows[0].doc_id);
            //....
            if ('0x'+docHash === ethHash) {
                console.log('hash zgodny');
                await res.sendFile(path.join(__dirname, '../../', rows[0].doc_path));
            } else {
                console.log('hash niezgodny' + docHash + " : "  + " : " + ethHash);
                res.status(404).end();
            }*/
        /*
        await fs.readFile(rows[0].doc_path, async (err, data) => {
            if (err) res.status(400).end();
            //TODO pobierz hash z blockchaina
            let ethHash = await getEthHash(rows[0].doc_client_id , rows[0].doc_id);
            //....
            if (('0x'+sha256(data.toString()) == ethHash ) && ('0x'+docHash === ethHash)) {
                console.log('hash zgodny');
                res.write(data);
                res.end();
            } else {
                console.log('hash niezgodny' + docHash + " : " + sha256(data.toString()) + " : " + ethHash);
                res.status(404).end();
            }
        });*/
        //  }
        res.status(200);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.verifyHash = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hash = req.params.hash;
        const userid = req.params.clientid;
        //TODO sprawdz w kontrakcie w blockchainie czy istnieje
        //...
        res.status(200);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getETHDoc = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const docid = req.params.docid;
        const userid = req.params.clientid;
        console.log("(getETHDoc) przyjalem parametry -> " + docid + " : " + userid);
        const returninghash = yield documents_sol_1.getEthHash(userid, docid);
        res.status(200).json({
            hash: returninghash
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getETHLastBlock = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const docid = req.params.docid;
        const userid = req.params.clientid;
        // console.log("(getETHLastBlock) przyjalem parametry -> "+docid+ " : " + userid);
        const lastblock = yield documents_sol_1.getEthLastBlock();
        res.status(200).json({
            block: lastblock.number,
            transaction: lastblock.hash,
            miner: lastblock.miner,
            nonce: lastblock.nonce
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getETHLastTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const docid = req.params.docid;
        const userid = req.params.clientid;
        console.log("(getETHDoc) przyjalem parametry -> " + docid + " : " + userid);
        // const returninghash = await getEthLastTransaction();
        res.status(200).json({
        // hash: returninghash
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.addETHDoc = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const docid = req.params.docid;
        const userid = req.params.clientid;
        const hash = req.params.hash;
        console.log("(getETHDoc) przyjalem parametry -> " + docid + " : " + userid + " : " + hash);
        const returninghash = yield documents_sol_1.addEthHash(hash, userid, docid);
        res.status(200).json({
            hash: returninghash
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.verifyETHDoc = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userid = req.params.clientid;
        const hash = req.params.hash;
        console.log("(verifyETHDoc) przyjalem parametry -> : " + userid + " : " + hash);
        const returninghash = yield documents_sol_1.verifyEthHash(hash, userid);
        res.status(200).json({
            hash: returninghash
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.addDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let docPath = "";
        let docHash = "";
        let docId = "";
        let trnId = "";
        let docContent, docName, docHashName, docSize;
        const clientId = req.body.clientid;
        try {
            for (let file of req.files) {
                docName = file.originalname;
                docPath = file.path;
                docContent = file.buffer;
                docHashName = file.filename;
                docSize = file.size;
                yield fs.readFile(file.path, (err, data) => {
                    if (err)
                        throw err;
                    docHash = sha256(data.toString());
                    console.log(docHash);
                });
            }
            /* const pool = new pg.Pool(config);
             const client = await pool.connect();
             await client.query('INSERT INTO documents( doc_client_id, doc_name, doc_size, doc_path, doc_hash ,doc_status) values ($1, $2, $3, $4, $5, $6) RETURNING doc_id',[ clientId, docName, docSize, docPath, docHash, "A"],(err, res) => {
                 if (err) {
                     console.error('Error in transaction', err.stack);
                 }
                 docId = res.rows[0].doc_id;
                 //TODO tutaj wywolaj funkcje zapisu do blockchaina
                  this.trnId = addEthHash(docHash,clientId, docId).then((res) => {
                      client.query('INSERT INTO transaction( trn_client_id, trn_doc_id, trn_eth_id) values ($1, $2, $3) RETURNING trn_id',[ clientId, docId, res],(err, res) => {
                          console.log(err);
                          console.log(res);
                      });
                  });
             });
 
             //...
             client.release();
 */
            res.status(200).send(docHash);
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
        ;
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.verifyDocument = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let docPath = "";
        let docHash = "";
        let docId = "";
        let trnId = "";
        let docContent, docName, docHashName, docSize;
        const clientId = req.body.clientid;
        console.log(req);
        try {
            for (let file of req.files) {
                docName = file.originalname;
                docPath = file.path;
                docContent = file.buffer;
                docHashName = file.filename;
                docSize = file.size;
                yield fs.readFile(file.path, (err, data) => {
                    if (err)
                        throw err;
                    docHash = sha256(data.toString());
                    console.log(docHash);
                });
            }
            //  const pool = new pg.Pool(config);
            //  const client = await pool.connect();
            // await verifyETHDoc(req, res);
            const returninghash = yield documents_sol_1.verifyEthHash(docHash, clientId);
            //...
            // client.release();
            res.status(200).send(returninghash);
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
        ;
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
exports.getHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const results = [];
        /* const pool = new pg.Pool(config);
         const client = await pool.connect();
         console.log(req);
         const clientid = req.body.clientid;
         const docHash = req.params.hash;
         const docid = req.body.doc_id;
         const {rows} = await client.query('SELECT * FROM transaction WHERE trn_client_id = $1 and trn_doc_id = $2 order by trn_inserttime desc', [clientid, docid]);
         client.release();
          await rows.forEach(data => {
            const dataeth =   getEthHistory(data.trn_eth_id);
             results.push(data);
            //results.push(dataeth);
             console.log("test1231 : " + JSON.stringify(data) + " : " + dataeth + " : " + results.length);
         })
 
         if (rows[0].doc_id > 0) {
 
         }*/
        console.log(results.length);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});
//# sourceMappingURL=documents.js.map