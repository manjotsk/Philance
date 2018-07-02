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

/*-- job application status-------*/

commit;