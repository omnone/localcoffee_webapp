DROP DATABASE IF EXISTS  localCoffee ;

CREATE DATABASE localCoffee ;
USE localCoffee ;

CREATE TABLE users (
     id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX username_UNIQUE (username ASC)
)  ENGINE=INNODB;

CREATE TABLE admin (
    id INT UNSIGNED NOT NULL,
    username VARCHAR(20) NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC),
    UNIQUE INDEX username_UNIQUE (username ASC)
)  ENGINE=INNODB;


CREATE TABLE pelatis (
    pel_id INT UNSIGNED NOT NULL,
    pel_name VARCHAR(25) DEFAULT 'unknown',
    pel_sur VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    pel_phone VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    PRIMARY KEY (pel_id),
    CONSTRAINT IDPEL FOREIGN KEY (pel_id)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;

CREATE TABLE manager (
    man_id INT UNSIGNED NOT NULL,
    man_name VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    man_sur VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    man_afm VARCHAR(10) DEFAULT 'unknown' NOT NULL,
    man_amka VARCHAR(11) DEFAULT 'unknown' NOT NULL,
    man_iban VARCHAR(27) DEFAULT 'unknown' NOT NULL,
    PRIMARY KEY (man_id),
    CONSTRAINT IDMAN FOREIGN KEY (man_id)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;
 


CREATE TABLE katastima (
    kat_name VARCHAR(30) DEFAULT 'unknown' NOT NULL,
    kat_lat DOUBLE(20 , 10 ) DEFAULT '0' NOT NULL,
	kat_lng DOUBLE(20 , 10 ) DEFAULT '0' NOT NULL,
    kat_phone VARCHAR(20) DEFAULT 'unknown' NOT NULL,
    kat_tziros DOUBLE(10 , 2 ) DEFAULT '0',
    kat_manager INT UNSIGNED,
    PRIMARY KEY (kat_name),
    CONSTRAINT KATMANAGEMENT FOREIGN KEY (kat_manager)
        REFERENCES manager (man_id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;



CREATE TABLE delivery (
    deliv_id INT UNSIGNED NOT NULL,
    deliv_name VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    deliv_sur VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    deliv_afm VARCHAR(10) DEFAULT 'unknown' NOT NULL,
    deliv_amka VARCHAR(11) DEFAULT 'unknown' NOT NULL,
    deliv_iban VARCHAR(27) DEFAULT 'unknown' NOT NULL,
    deliv_katastasi ENUM('on', 'off'),
    deliv_lat DOUBLE(20 , 10 ) DEFAULT '0' NOT NULL,
	deliv_lng DOUBLE(20 , 10 ) DEFAULT '0' NOT NULL,
    deliv_ores DOUBLE(20 , 10 ) default '0' not null,
    PRIMARY KEY (deliv_id),
    CONSTRAINT IDDELIV FOREIGN KEY (deliv_id)
        REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;


create table vardia (
  delivery_id INT UNSIGNED NOT NULL,
  vardia_start  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  vardia_end  TIMESTAMP DEFAULT '00:00:00' NOT NULL,
  total_hours DOUBLE(20 , 5 ) default '0' not null,
PRIMARY KEY (delivery_id,vardia_start),
    CONSTRAINT IDSDELIV FOREIGN KEY (delivery_id)
        REFERENCES delivery (deliv_id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;



CREATE TABLE paraggelia (
    order_id INT(10) NOT NULL AUTO_INCREMENT,
    order_addr VARCHAR(50) DEFAULT 'unknown' NOT NULL,
    order_kat VARCHAR(30) ,
    order_katastasi enum('delivered','undelivered') default 'undelivered',
    order_date DATETIME ,
    order_deliv INT UNSIGNED,
    order_apostasi DOUBLE(20 , 10 ) default '0',
    PRIMARY KEY (order_id),
     CONSTRAINT KATPARAG FOREIGN KEY (order_kat)
        REFERENCES katastima (kat_name)
        ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT DELPARAG FOREIGN KEY (order_deliv)
        REFERENCES delivery (deliv_id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;

CREATE TABLE paraggelia_pelati (
    id_paraggelias INT(10) DEFAULT '0' NOT NULL,
    id_pelati INT UNSIGNED NOT NULL,
    PRIMARY KEY (id_paraggelias , id_pelati),
    CONSTRAINT IDPARAG FOREIGN KEY (id_paraggelias)
        REFERENCES paraggelia (order_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT MAILPEL FOREIGN KEY (id_pelati)
        REFERENCES pelatis (pel_id)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;


CREATE TABLE items (
    name VARCHAR(25) DEFAULT 'unknown' NOT NULL,
    eidos ENUM('kafes', 'geuma'),
    price DOUBLE(10 , 2 ) DEFAULT '0' NOT NULL,
    PRIMARY KEY (name)
)  ENGINE=INNODB;


CREATE TABLE apothema (
    apoth_kat VARCHAR(30),
    apoth_proion VARCHAR(25),
    apoth_posot INT(10),
    PRIMARY KEY (apoth_kat , apoth_proion),
    CONSTRAINT KATAPOTHS FOREIGN KEY (apoth_kat)
        REFERENCES katastima (kat_name)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PROAPOTH FOREIGN KEY (apoth_proion)
        REFERENCES items (name)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;


CREATE TABLE proionta_paraggelias (
    parag_id INT(10),
    parag_proion VARCHAR(25),
    posotita INT(2),
    PRIMARY KEY (parag_id , parag_proion),
    CONSTRAINT IDORDER FOREIGN KEY (parag_id)
        REFERENCES paraggelia (order_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT PROIONNAME FOREIGN KEY (parag_proion)
        REFERENCES items (name)
        ON UPDATE CASCADE ON DELETE CASCADE
)  ENGINE=INNODB;

####################################################################################

INSERT INTO items(name,eidos,price) VALUES
("Freddo Espresso","kafes",1.5),
("Espresso","kafes",1.3),
("Frape","kafes",1),
("Ελληνικός","kafes",1),
("Φίλτρου","kafes",1.2),
("Τυρόπιτα","geuma",2.2),
("Χορτόπιτα","geuma",3),
("Κουλούρι","geuma",2),
("Τοστ","geuma",1.2),
("Κεικ","geuma",0.5);

#insert into katastima(kat_name,kat_addr,kat_phone,kat_manager) values
#("Κατάστημα Πλατεία Γεωργιού","-","12",1);

#insert into katastima(kat_name,kat_addr,kat_phone,kat_manager) values
#("Κατάστημα Πλατεία ν. Γεωργιού","-","12",5);


