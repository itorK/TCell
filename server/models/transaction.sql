CREATE TABLE transaction (
trn_id SERIAL,
trn_eth_id VARCHAR(255) NOT NULL,
trn_inserttime TIMESTAMP DEFAULT NOW(),
trn_doc_id INTEGER,
trn_client_id INTEGER
);
