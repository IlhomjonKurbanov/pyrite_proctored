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

-- create ArticleDetails table
CREATE TABLE ArticleDetails(
    ID VARCHAR(255),
    LinkDensity FLOAT(10, 8),
    Video INT,
    Images INT,
    WordCount INT,
    BodyFontSize INT,
    TitleFontSize INT,
    SerifP INT,
    VideoLocation INT,
    PRIMARY KEY (ID)
) ENGINE = INNODB
