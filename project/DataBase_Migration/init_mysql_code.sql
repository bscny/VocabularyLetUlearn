CREATE TABLE Current_Room(
    ROOM_ID int not null primary key,
    Pass_word int not null
);

CREATE TABLE Users(
    USER_ID int not null primary key AUTO_INCREMENT,
    User_name varchar(300) not null,
    Email varchar(300) not null ,
    Pass_word varchar(300) not null ,
    Is_verified bool not null default false,
    Ranking_points int not null default 0,
    Last_login datetime not null default now(),
    Current_room_id int,
    
    constraint fk_CurrentRoom_RoomId_Users
    foreign key(Current_room_id) references vocab_let_u_learn.Current_Room(ROOM_ID)
    on delete set null
);

CREATE TABLE Folders(
    FOLDER_ID int not null primary key AUTO_INCREMENT,
    Folder_name varchar(300) not null,
    Owner_id int not null,
    
    constraint fk_OwnerId_UserId_Folders
    foreign key(Owner_id) references vocab_let_u_learn.Users(USER_ID)
    on delete cascade
);

CREATE TABLE Sets(
    SET_ID int not null primary key AUTO_INCREMENT,
    Set_name varchar(300) not null,
    Is_public bool not null default true,
    In_folder_id int not null,
    
    constraint fk_InFolder_FolderId_Sets
    foreign key(In_folder_id) references vocab_let_u_learn.Folders(FOLDER_ID)
);

CREATE TABLE Vocabulary(
    SET_ID int not null,
    WORD varchar(300) not null,
    Definitions varchar(500) not null,
    Sentence varchar(1000),
    Create_date datetime not null default now(),
    Is_marked bool not null default false,
    Num_test int not null default 0,
    Num_wrong int not null default 0,
    
    constraint GROUP_PRIMARY_Vocabulary
    primary key(SET_ID, WORD),
    
    constraint fk_SetId_SetId_Vocabulary
    foreign key(SET_ID) references vocab_let_u_learn.Sets(SET_ID)
    on delete cascade
);

CREATE TABLE Friend(
    USER_ID int not null,
    FRIEND_ID int not null,
    
    constraint GROUP_PRIMARY_Friend
    primary key(USER_ID, FRIEND_ID),
    
    constraint fk_UsrId_UsrId_Friend
    foreign key(USER_ID) references vocab_let_u_learn.Users(USER_ID)
    on delete cascade,
    
    constraint fk_FriendId_UsrId_Friend
    foreign key(FRIEND_ID) references vocab_let_u_learn.Users(USER_ID)
    on delete cascade
);

CREATE TABLE Use_Set_In_Room(
    SET_ID int not null,
    ROOM_ID int not null,
    
    constraint GROUP_PRIMARY_UseSetInRoom
    primary key(SET_ID, ROOM_ID),
    
    constraint fk_SetId_SetId_UseSetInRoom
    foreign key(SET_ID) references vocab_let_u_learn.Sets(SET_ID)
    on delete cascade,
    
    constraint fk_RoomId_RoomId_UseSetInRoom
    foreign key(ROOM_ID) references vocab_let_u_learn.Current_Room(ROOM_ID)
    on delete cascade
);

CREATE TABLE Ranking_Exam(
    EXAM_ID int not null primary key AUTO_INCREMENT,
    Create_date datetime not null default now()
);

CREATE TABLE Question(
    QUESTION_ID int not null primary key AUTO_INCREMENT,
    Correct_ans varchar(300) not null,
    OptionA varchar(300) not null,
    OptionB varchar(300) not null,
    OptionC varchar(300) not null,
    Ans_definition varchar(500) not null,
    Sentence varchar(1000) not null
);

CREATE TABLE Take_Exam(
	USER_ID int not null,
    EXAM_ID int not null,
    Plus_points int not null,
    
    constraint GROUP_PRIMARY_TakeExam
    primary key(USER_ID, EXAM_ID),
    
    constraint fk_UsrId_UsrId_TakeExam
    foreign key(USER_ID) references vocab_let_u_learn.Users(USER_ID)
    on delete cascade,
    
    constraint fk_ExamId_ExamId_TakeExam
    foreign key(EXAM_ID) references vocab_let_u_learn.Ranking_Exam(EXAM_ID)
    on delete cascade
);

CREATE TABLE Question_In_Exam(
    EXAM_ID int not null,
    QUESTION_ID int not null,
    
    constraint GROUP_PRIMARY_QuestionInExam
    primary key(EXAM_ID, QUESTION_ID),
    
    constraint fk_ExamId_ExamId_QuestionInExam
    foreign key(EXAM_ID) references vocab_let_u_learn.Ranking_Exam(EXAM_ID)
    on delete cascade,
    
	constraint fk_QId_QId_QuestionInExam
    foreign key(QUESTION_ID) references vocab_let_u_learn.Question(QUESTION_ID)
    on delete cascade
);

CREATE TABLE History_Answer(
    USER_ID int not null,
    QUESTION_ID int not null,
    Is_correct bool not null,
    
    constraint GROUP_PRIMARY_HistoryAnswer
    primary key(USER_ID, QUESTION_ID),
    
    constraint fk_UsrId_UsrId_HistoryAnswer
    foreign key(USER_ID) references vocab_let_u_learn.Users(USER_ID)
    on delete cascade,
    
	constraint fk_QId_QId_HistoryAnswer
    foreign key(QUESTION_ID) references vocab_let_u_learn.Question(QUESTION_ID)
    on delete cascade
);