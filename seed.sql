use vocab_let_u_learn;

insert into users(User_name, Email, Pass_word)
values
("test1", "test1@email.com", "test1PW"),
("test2", "test2@email.com", "test2PW"),
("test3", "test3@email.com", "test3PW");

insert into folders(Folder_name, Owner_id)
values
("testFolder1-usr1", 1),
("testFolder2-usr1", 1),
("testFolder3-usr1", 1),
("testFolder1-usr2", 2),
("testFolder2-usr2", 2),
("testFolder3-usr2", 2),
("testFolder1-usr3", 3);

insert into folders(Folder_name, Owner_id, Parent_folder_id)
values
("testFolder4-usr1", 1, 1),
("testFolder5-usr1", 1, 1),
("testFolder6-usr1", 1, 2),
("testFolder4-usr2", 2, 5);

insert into sets(Set_name, In_folder_id)
values
("testSet1-folder1", 1),
("testSet2-folder1", 1),
("testSet3-folder1", 1),
("testSet1-folder2", 2),
("testSet2-folder2", 2),
("testSet3-folder2", 2),
("testSet4-folder1", 1),
("testSet1-folder3", 3),
("testSet2-folder3", 3),
("testSet1-folder4", 4),
("testSet2-folder4", 4),
("testSet3-folder4", 4),
("testSet1-folder5", 5),
("testSet1-folder6", 6),
("testSet1-folder1-folder4", 8),
("testSet1-folder1-folder5", 9);

insert into vocabulary(SET_ID, WORD, Definitions, Sentence)
values
(1, "apple", "a red fruit", "I have an apple"),
(1, "banana", "a yellow fruit", "I have a banana"),
(1, "car", "a tool to help us move faster", "I have a car"),
(2, "apple", "a red fruit", "I have an apple"),
(2, "banana", "a yellow fruit", "I have a banana"),
(2, "car", "a tool to help us move faster", "I have a car"),
(3, "apple", "a red fruit", "I have an apple"),
(3, "banana", "a yellow fruit", "I have a banana"),
(3, "car", "a tool to help us move faster", "I have a car"),
(4, "apple", "a red fruit", "I have an apple"),
(4, "banana", "a yellow fruit", "I have a banana"),
(4, "car", "a tool to help us move faster", "I have a car"),
(5, "apple", "a red fruit", "I have an apple"),
(5, "banana", "a yellow fruit", "I have a banana"),
(5, "car", "a tool to help us move faster", "I have a car"),
(6, "apple", "a red fruit", "I have an apple"),
(6, "banana", "a yellow fruit", "I have a banana"),
(6, "car", "a tool to help us move faster", "I have a car"),
(7, "apple", "a red fruit", "I have an apple"),
(7, "banana", "a yellow fruit", "I have a banana"),
(7, "car", "a tool to help us move faster", "I have a car"),
(8, "apple", "a red fruit", "I have an apple"),
(8, "banana", "a yellow fruit", "I have a banana"),
(8, "car", "a tool to help us move faster", "I have a car"),
(9, "apple", "a red fruit", "I have an apple"),
(9, "banana", "a yellow fruit", "I have a banana"),
(9, "car", "a tool to help us move faster", "I have a car"),
(10, "apple", "a red fruit", "I have an apple"),
(10, "banana", "a yellow fruit", "I have a banana"),
(10, "car", "a tool to help us move faster", "I have a car"),
(11, "apple", "a red fruit", "I have an apple"),
(11, "banana", "a yellow fruit", "I have a banana"),
(11, "car", "a tool to help us move faster", "I have a car"),
(12, "apple", "a red fruit", "I have an apple"),
(12, "banana", "a yellow fruit", "I have a banana"),
(12, "car", "a tool to help us move faster", "I have a car"),
(13, "apple", "a red fruit", "I have an apple"),
(13, "banana", "a yellow fruit", "I have a banana"),
(13, "car", "a tool to help us move faster", "I have a car"),
(14, "apple", "a red fruit", "I have an apple"),
(14, "banana", "a yellow fruit", "I have a banana"),
(14, "car", "a tool to help us move faster", "I have a car"),
(15, "apple", "a red fruit", "I have an apple"),
(15, "banana", "a yellow fruit", "I have a banana"),
(15, "car", "a tool to help us move faster", "I have a car"),
(16, "apple", "a red fruit", "I have an apple"),
(16, "banana", "a yellow fruit", "I have a banana"),
(16, "car", "a tool to help us move faster", "I have a car");