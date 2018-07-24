-- insert table script
/*-- job application status-------*/
insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'APPLIED', 'Applicant applied for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'IN REVIEW', 'Applicant being reviewed for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'APPROVED', 'Applicant approved for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'REJECTED', 'Applicant rejected for a project', CURTIME(), 0, CURTIME(),0);

/* Impact Categories*/ 
insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'COMMUNITY', 'Community', 'Community Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'ELDERLY', 'Elderly', 'Elderly Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'HOMELESS', 'Homeless', 'Homeles Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'OTHER', 'Other', 'Other Service', curtime(), 0, curtime(), 0);

/*User Types*/
insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Owner', 'Person who creates a project', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Sponsor', 'Person who funds a project', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Member', 'All freelancers who support fulfill a project', curtime(), 0, curtime(), 0);

/*Project Roles*/
insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Developer', 'Developer', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Manager', 'Project Manager', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Tester', 'Tester', curtime(), 0, curtime(), 0);

/* Skills Lookup*/
insert into philance.philance_lookups
values ('SKILLS', 'IT', 'Database Development', 'Database Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'IT', 'JAVA Development', 'JAVA Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'BUSINESS', 'Project Management', 'Project Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'OTHER', 'Other', 'Other', curtime(), 0, curtime(), 0);

/* Possible notificaiton that user can set */
insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Message', 'When another Philance members messages a user', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Project Application Status', 'When a project application is approved/rejected', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Project Updates', 'When a updates are available on project', curtime(), 0, curtime(), 0);



commit;
