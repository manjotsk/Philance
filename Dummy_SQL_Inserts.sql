/* sign up user */
insert into philance.users(user_id,fname,lname,email,password,status, creation_date, created_by, last_updated_date, last_updated_by)
values	(' 1', 'Karthik', 'Sarvepali', 'test@gmail.com', 'welcome123','Active', CURTIME(), 1, CURTIME(), 1);

insert into philance.users(user_id,fname,lname,email,password,status, creation_date, created_by, last_updated_date, last_updated_by)
values	(' 2', 'Vijay', 'Gandra', 'test1@gmail.com', 'welcome123','Active', CURTIME(), 2, CURTIME(), 2);


/* Update User Profile*/
Update philance.users
set Fname = 'Karthik',
    lname ='Sarvepalli',
    email = 'test@gmail.com',
    password ='welcome123',
    ph_number = '1234567890',
    organization = 'Philance',
    title = 'Core Team',
    rate = '50',
    auth_src = 'email',
    last_login = curtime(),
    last_updated_date = curtime(),
    last_updated_by = 1,
    interests = '#Service #localCommunities #NGO'
where user_id = 1;

Update philance.users
set Fname = 'Vijay',
    lname ='Gabdra',
    email = 'test1@gmail.com',
    password ='welcome123',
    ph_number = '1234567890',
    organization = 'Philance',
    title = 'Core Team',
    rate = '50',
    auth_src = 'email',
    last_login = curtime(),
    last_updated_date = curtime(),
    last_updated_by = 2,
    interests = '#Help #Service #localCommunities #NGO'
where user_id = 2;

/*Add User Skills and Certifications*/
insert into philance.user_skills
values (1, 'Database Development','Database Development', 'Yes', null, curdate()-300, null, curtime(), 1, curtime(), 1);

insert into philance.user_skills
values (1, 'BUSINESS', 'Project Management', 'Yes', null, curdate()-300, null, curtime(), 1, curtime(), 1);

insert into philance.user_skills
values (2, 'JAVA Development', 'JAVA Development', 'Yes', null, curdate()-300, null, curtime(), 1, curtime(), 1);

insert into philance.user_skills
values (2, 'Other', 'Project Lead', 'Yes', null, curdate()-300, null, curtime(), 1, curtime(), 1);

/* insert notification preferences for users */
insert into philance.user_notifications
values (1, 'Project Updates', 'Yes', 'No', 'Yes', curtime(), 1, curtime(), 1);

insert into philance.user_notifications
values (2, 'Project Updates', 'Yes', 'Yes', 'Yes', curtime(), 2, curtime(), 2);

insert into philance.user_notifications
values (2, 'Message', 'Yes', 'No', 'Yes', curtime(), 2, curtime(), 2);


/* User Creates a Project */
insert into philance.projects
values(1, 'Develop a database', 'Develop a database to support oldage home operations', 2, 2, 'Detroit, MI', curtime(), curtime()+3, '150', 'Active', curtime(), 1, curtime(),1);

/* insert skills needed, impact categories, and any other lists'*/
insert into philance.project_details 
values (1, 'SKILLS', 'Database Development', 'No', null,null, null,null,null,null, curtime(),1,curtime(),1);

insert into philance.project_details 
values (1, 'IMPACT_CATEGORY', 'Elderly', 'No', null,null, null,null,null,null, curtime(),1,curtime(),1);

insert into philance.project_details 
values (1, 'IMPACT_CATEGORY', 'Other', 'No', null,'Oldage Homes', null,null,null,null, curtime(),1,curtime(),1);

/* add project attachments */
insert into philance.project_attachments
values (1, 'Data captured', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', curtime(), 1, curtime(),1);

insert into philance.project_tasks
values(1, 1, 'Create logical Diagram', 'create logical DB diagram', null, null, 'Pending', 5, null);

insert into philance.project_tasks
values(1, 2, 'Create DB Scripts', 'create DB scripts', null, null, 'Pending', 10, null);

/* users apply for project */
insert into philance.project_team
values (1, 2, 'Applicant', null, curtime(), curtime(), 'Please consider my application', 'APPLIED');

/* approve applicant to a project and assign a role*/
update philance.project_team
set role = 'Developer',
    type = 'Project Member',
    status = 'APPROVED'
where project_id = 1
and user_id =2;
