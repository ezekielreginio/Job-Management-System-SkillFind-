const { login } = require("./login/login");
const { applicant_portfolio } = require("./applicant_portfolio/home");
const { applicant_experience } = require("./applicant_portfolio/experience");
const { applicant_education } = require("./applicant_portfolio/education");
const { applicant_skill } = require("./applicant_portfolio/skill");
const { applicant_language } = require("./applicant_portfolio/language");
const { job_applications } = require("./applicant_portfolio/job_applications");
const { pwdjob_applications } = require("./applicant_portfolio/pwdjob_applications");
const { employer_dashboard } = require("./employer_dashboard/index");
const { load_qualifications } = require("./employer_dashboard/load_qualifications");
const { employer_addjob } = require("./employer_dashboard/addjob");
const { password_reset } = require("./login/password_reset");
const { pwdpassword_reset } = require("./login/pwdpassword_reset");
const { handicapped_index } = require("./app_handicapped/index");
const { handicapped_login } = require("./app_handicapped/login");
const { handicapped_signup } = require("./app_handicapped/signup");
const { portfolio_summary } = require("./applicant_portfolio/portfolio");
const { jobs_panel } = require("./employer_dashboard/jobspanel");
const { view_applications } = require("./employer_dashboard/view_applicants");
const { jobs_search } = require("./job_search_engine/jobsearch");
const { personal_info } = require("./applicant_portfolio/personalinfo");
const { pwd_exp } = require("./app_handicapped/pwd-exp");
const { pwd_edu } = require("./app_handicapped/pwd-edu");
const { pwd_sk } = require("./app_handicapped/pwd-sk");
const { pwd_lang } = require("./app_handicapped/pwd-lang");
const { pwd_resume } = require("./app_handicapped/pwd-resume");
const { pwd_commands } = require("./app_handicapped/pwd-command-list");
//const { jobs_search } = require("./job_search_engine/jobsearchsss");
import "./job_search_engine/jobsearch";
import "./job_search_engine/pwdjobsearch";




