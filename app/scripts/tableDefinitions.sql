-- create Subjects table
CREATE TABLE Subjects(
    SubjectID INT NOT NULL AUTO_INCREMENT,
    ArticleOrder VARCHAR(255),
    Age INT,
    Field1 VARCHAR(255),
    Field2 VARCHAR(255),
    Field3 VARCHAR(255),
    Gender VARCHAR(255),
    DateConsented VARCHAR(255),
    PRIMARY KEY (SubjectID)
) ENGINE = INNODB

-- create ArticleResponses table
CREATE TABLE ArticleResponses(
    SubjectID INT NOT NULL,
    Trial INT,
    ArticleID INT,
    Likert INT,
    PageTime INT,
    SpontaneousResponseCount INT,
    MoreBelievableCount INT
) ENGINE = INNODB

-- create SpontaneousResponses table
CREATE TABLE SpontaneousResponses(
    SRID INT NOT NULL AUTO_INCREMENT,
    SubjectID INT NOT NULL,
    Trial INT,
    ArticleID INT,
    ElementID VARCHAR(255),
    MoreBelievable TINYINT(1), -- boolean, 0 = 'less believable', 1 = 'more believable'
    PRIMARY KEY (SRID)
) ENGINE = INNODB

-- create NarrativeResponses table
CREATE TABLE NarrativeResponses(
    SRID INT NOT NULL,
    Response TEXT -- limited to 65535
) ENGINE = INNODB

-- create PrizeDrawingParticipants table
CREATE TABLE PrizeDrawingParticipants(
    EmailAddress VARCHAR(255),
    PRIMARY KEY (EmailAddress)
) ENGINE = INNODB
