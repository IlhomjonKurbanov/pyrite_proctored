-- create Subjects table
CREATE TABLE Subjects(
    SubjectID INT NOT NULL AUTO_INCREMENT,
    ArticleOrder TEXT,
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
    ArticleID VARCHAR(255),
    Likert INT,
    PageTime INT,
    SpontaneousResponseCount INT,
    MoreBelievableCount INT
) ENGINE = INNODB

-- create PrizeDrawingParticipants table
CREATE TABLE PrizeDrawingParticipants(
    EmailAddress VARCHAR(255),
    PRIMARY KEY (EmailAddress)
) ENGINE = INNODB
