/*drop database philance;*/
Create database philance;

/*drop table philance.messages;*/
CREATE TABLE philance.messages (
    projec_id  INT,
    From_user  INT not null,
    to_user INT ,
    subject MEDIUMTEXT,
    body LONGTEXT,
    mstatus VARCHAR(10) not null default 'DRAFT', /* draft, sent */
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    index Msgs_project_ix (projec_id),
    index Msgs_fromuser_ix (From_user),
    index Msgs_touser_ix (to_user)
    ); 

/*drop table philance.philance_lookups;*/
/* save user/project skills, project roles and other profile related informaiton */
CREATE TABLE philance.philance_lookups (
    type VARCHAR(100),
    id VARCHAR(100),
    value VARCHAR(100),
    description VARCHAR(1000),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (type , id, value)
);


/*drop table philance.users;*/
CREATE TABLE philance.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    Fname VARCHAR(100),
    lname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(1000),
    ph_number VARCHAR(20),
    organization VARCHAR(200),
    title VARCHAR(200),
    rate DECIMAL(5 , 2 ),
    auth_src VARCHAR(100),
    last_login DATETIME,
    status VARCHAR(50),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    interests BLOB,
    INDEX usr_fname_ix (fname),
    INDEX usr_lname_ix (lname),
    INDEX usr_interests_ix (interests(3072) )
);

/*drop table philance.user_skills;*/
CREATE TABLE philance.user_skills (
    user_id INT,
    sKill_Id NUMERIC,
    skill_name VARCHAR(300),
    certified VARCHAR(3) DEFAULT 'NO',
    certification_link LONGTEXT,
    start_date DATETIME,
    end_date DATETIME,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id),
    PRIMARY KEY (user_id , skill_name)
);

/*drop table philance.user_notifications;    */
CREATE TABLE philance.user_notifications (
    user_id INT,
    notification_id INT,
    notification_name VARCHAR(200),
    value VARCHAR(100),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id),
    PRIMARY KEY (user_id , notification_id)
);


/* Project impact cater, project roles, user types */
CREATE TABLE philance.project_lookups (
    type VARCHAR(100),
    id VARCHAR(100),
    value VARCHAR(100),
    description VARCHAR(1000),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (type , id , value)
);

/*drop table philance.projects;*/
CREATE TABLE philance.projects (
    project_id INT AUTO_INCREMENT primary key,
    Project_name VARCHAR(500),
    description longblob,
    volunteers NUMERIC,
    freelancers NUMERIC,
    location VARCHAR(3072),
    start_date DATETIME,
    end_date DATETIME,
    estimated_budget DECIMAL(10 , 2 ),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    index proj_project_name_ix (Project_name)
);

/*drop table philance.project_needs;*/
CREATE TABLE philance.project_needs (
    project_id INT,
    type VARCHAR(50),
    name VARCHAR(100),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    primary key(project_id, type, name),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id)
);

/*drop table philance.project_attachments;*/
CREATE TABLE philance.project_attachments (
    project_id INT,
    name VARCHAR(500),
    attachment BLOB,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    primary key (project_id, name),
    index projatch_name_ix (name) 
);

CREATE TABLE philance.project_tasks (
    project_id INT,
    task_id int ,
    task_name VARCHAR(500),
    description BLOB,
    assigned_to INT,
    assigned_by INT,
    status VARCHAR(50),
    target_hours DECIMAL(5 , 2 ),
    actual_hours DECIMAL(5 , 2 ),
    PRIMARY KEY (project_id , task_id),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id),
    FOREIGN KEY (assigned_to)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (assigned_by)
        REFERENCES philance.users (user_id),
	index projtask_task_name_ix (task_name)
);

CREATE TABLE philance.project_task_updates (
    project_id INT,
    task_id int,
    commented_by INT,
    commment BLOB,
    attachment BLOB,
    FOREIGN KEY (project_id , task_id)
        REFERENCES philance.project_tasks (project_id , task_id)
);

/*-- get data from philance lookups for roles-- also includes applicants details */
CREATE TABLE philance.project_team (
    project_id INT,
    user_id INT,
    role varchar(200), 
    type varchar(200),
    start_date DATETIME,
    end_date DATETIME,
    applicant_message blob,
    status varchar(100), -- applied, reviewd, rejected, accepted
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id),
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id)
);

