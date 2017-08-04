-- subject, age, gender, field1, field2, field3, trial, articleID, linkDensity, video, images, wordCount, fontSize, serifP, videoLocation, belief, pgtime

SELECT Subjects.SubjectID,
       Subjects.Age,
       Subjects.Gender,
       Subjects.Field1,
       Subjects.Field2,
       Subjects.Field3,
       Responses.Trial,
       Responses.ArticleID,
       Details.LinkDensity,
       Details.Video,
       Details.Images,
       Details.WordCount,
       Details.BodyFontSize,
       Details.TitleFontSize,
       Details.SerifP,
       Details.VideoLocation,
       Responses.Likert,
       Responses.PageTime
FROM Subjects
INNER JOIN ArticleResponses Responses
ON Subjects.SubjectID = Responses.SubjectID
INNER JOIN ArticleDetails Details
ON Responses.ArticleID = Details.ID
ORDER BY Subjects.SubjectID, Responses.Trial;
