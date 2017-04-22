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
    Likert INT
) ENGINE = INNODB

-- create SpontaneousResponses
CREATE TABLE SpontaneousResponses(

) ENGINE = INNODB

-- create PrizeDrawingParticipants
CREATE TABLE PrizeDrawingParticipants(
    EmailAddress VARCHAR(255),
    PRIMARY KEY (EmailAddress)
) ENGINE = INNODB
