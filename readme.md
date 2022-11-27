# GFE - System

> a place to communicate with your doctors

# Changes Logs

> Please document changes made in the push in this file with a version number and add that version number in the commit message. This will help us track changes in each version. (f) fixed, (i) improved, (n) new feature

- ### v1.0.59 - 14-Nov-2022

1. (n) text, approvedConditionalIndicator, approvedConditionalText added in gfeTreatmentQuestions table
2. (n) auto filled above added fields at the the of gfe completion attempt
3. (f) invoice customer role filter fixed

- ### v1.0.58 - 12-Nov-2022

1. (n) gfe completed api changed question added
2. (n) treatmentNames array added in question fetch apis

- ### v1.0.57 - 12-Nov-2022

1. (f) old question functionality removed

- ### v1.0.56 - 12-Nov-2022

  1. (n) question add api added
  2. (n) question update api added
  3. (n) question fetch api added
  4. (n) question filter api added
  5. (f) patient medical history bug fixed

- ### v1.0.55 - 09-Nov-2022

  1. (f) date filter bug fixed

- ### v1.0.54 - 08-Nov-2022

  1. (n) refactor
  2. (n) payment add api added
  3. (n) payment get api added
  4. (n) payment filter api added
  5. (n) payment update api added

- ### v1.0.53 - 07-Nov-2022

  1. (n) some refactor and docs

- ### v1.0.52 - 03-Nov-2022

  1. (n) medical director signature added in contract in base64
  2. (n) director patch api added
  3. (n) reset password email api added
  4. (n) reset password api added
  5. (n) userOTPS table added to db

- ### v1.0.51 - 03-Nov-2022

  1. (n) invoice detail grouped added
  2. (f) some refactor

- ### v1.0.50 - 26-Oct-2022

  1. (f) gfe count date issue fixed
  2. (n) node-scheduler added
  3. (n) jobs added (auto-invoice-generation, queued-gfe-check-activity, joined-gfe-check-activity)
  4. (f) gfe count string to int issue
  5. (n) change provider dashboard to admin dashboard
  6. (n) stripe package added
  7. (n) get online provider api added
  8. (n) provider ping api added
  9. (n) online provider state added
  10. (n) online provider expiration check job added
  11. (n) invoice fetch schema added

- ### v1.0.49 - 27-Oct-2022

  1. (i) customer dashboard changed
  2. (n) gfe count result api added

- ### v1.0.48 - 26-Oct-2022

  1. (n) gfe end call api added
  2. (n) "gfe-attendee-meeting-end-event" event added
  3. (n) "startedAt" field added in gfes table
  4. (n) customer dashboard added
  5. (n) provider dashboard added
  6. (n) admin dashboard added

- ### v1.0.47 - 21-Oct-2022

  1. (n) gfe queued ping functionality implemented

- ### v1.0.46 - 20-Oct-2022

  1. (n) invoice update api added
  2. (n) invoice fetch api added
  3. (n) invoice filter api added

- ### v1.0.45 - 19-Oct-2022

  1. (n) customer subscription save api added
  2. (n) auto invoice generation added

- ### v1.0.44 - 17-Oct-2022

  1. (n) provider contract added
  2. (n) medical director fetch api added
  3. (n) gfe directed comment formatted comment field added

- ### v1.0.43 - 13-Oct-2022

  1. (n) date of birth not fetching correctly
  2. (n) contract added
  3. (n) gfe location added
  4. (n) contract rendered added
  5. (n) evaluatedby as zero

- ### v1.0.42 - 13-Oct-2022

  1. (n) date of birth not saving correctly
  2. (n) zip field added in customer location table
  3. (n) credentials save api
  4. (n) logs format and multiple log file functionality added

- ### v1.0.41 - 11-Oct-2022

  1. (f) change build folder from build to src to fix the logic of middleware

- ### v1.0.40 - 11-Oct-2022

  1. (f) added review and director comment in gfe filter and fetch apis
  2. (f) queries and template fixed
  3. (f) payload not sending in response of gfe review api
  4. (f) only completed gfe is showing to customer not the reviewed one

- ### v1.0.39 - 07-Oct-2022

  1. (f) global error handler added
  2. (n) add logs folder and error-log.txt file to log
  3. (n) clinicalConsideration field added at the time of completion of gfe
  4. (n) only on provider ping expiration remove gfe from joined queue
  5. (n) patients not getting filtered by customerid

- ### v1.0.38 - 06-Oct-2022

  1. (f) gfe view count of each director
  2. (n) only completed gfe will show to all directors
  3. (n) statusText added in gfeTreatments table
  4. (n) gfe completion request schema updated statusText added
  5. (f) gfe ping not receiving from patient bug fixed

- ### v1.0.37 - 06-Oct-2022

  1. (f) gfe disconnect issue fixed
  2. (n) clinical/medical director process has been completed
  3. (n) customer medical director process has been completed
  4. (n) gfe review process completed
  5. (n) provider can comment on gfe at the time of marking gfe completed

- ### v1.0.36 - 03-Oct-2022

  1. (n) build command added in package.json file

- ### v1.0.35 - 03-Oct-2022

  1. (f) shift again approved_text, denied_text, defer_text fields from categories table to treatment table ughhhh!!!
  2. (n) package added mocha and chai
  3. (n) customer creation test case created

- ### v1.0.34 - 31-Sep-2022

  1. (f) gfe format fixed
  2. (n) requeue gfe if not getting pinged by provider between allowed duration
  3. (f) gfe ping mechanism: fixed wrong ping expiration condition

- ### v1.0.33 - 30-Sep-2022

  1. (n) location id customer filter added
  2. (n) provider id gfe filter added
  3. (n) customer id gfe filter added
  4. (n) customer id patient filter added

- ### v1.0.32 - 30-Sep-2022

  1. (n) gfe ping api for providers and patients

- ### v1.0.31 - 29-Sep-2022

  1. (i) shift approved_text, denied_text, defer_text fields from treatment table to categories
  2. (i) gfe completed schema change

- ### v1.0.30 - 28-Sep-2022

  1. (i) remove required validation from patient's medication, allergies and email fields
  2. (i) added field medical history to patient

- ### v1.0.29 - 28-Sep-2022

  1. (i) patient email is nullable
  2. (i) allowed gfe-formatted-id in gfe connect and gfe disconnect api

- ### v1.0.28 - 27-Sep-2022

  1. (n) copliance add api
  2. (n) copliance update api
  3. (n) copliance remove api
  4. (n) copliance fetch api

- ### v1.0.27 - 26-Sep-2022

  1. (n) manufacture add api
  2. (n) manufacture update api
  3. (n) manufacture remove api
  4. (n) manufacture fetch api
  5. (n) add question array in Gfe fetch api

- ### v1.0.26 - 24-Sep-2022

  1. (n) gfe treatment table added
  2. (n) gfe treatment question table added
  3. (n) Gfe add endpoint updated
  4. (n) Gfe fetch endpoint updated
  5. (n) Gfe filter endpoint updated
  6. (n) 3 fields added in treatment schema (approved text, denied text, defer text)

- ### v1.0.25 - 21-Sep-2022

  1. (n) save customers treatment api
  2. (n) fetch customers treatments api

- ### v1.0.24 - 18-Sep-2022

  1. (n) update patient API
  2. (n) update treatment API
  3. (n) update category API

- ### v1.0.23 - 17-Sep-2022

  1. (f) location feature fix

- ### v1.0.22 - 16-Sep-2022

  1. (n) customerlocation table added in db
  2. (n) added locations fields in customer fetch, filter and create api

- ### v1.0.21 - 14-Sep-2022

  1. (n) location table added in db
  2. (n) create location api
  3. (n) update location api
  4. (n) fetch location api
  5. (n) delete location api

- ### v1.0.20 - 13-Sep-2022

  1. (n) set booking date api
  2. (n) add api key authorization

- ### v1.0.19 - 10-Sep-2022

  1. (f) join api status not checked before mark fixed
  2. (f) some other fixes

- ### v1.0.18 - 9-Sep-2022

  1. (n) agora integration
  2. (n) pusher events updated
  3. (n) gfe mark completed and failed status
  4. (n) notify ui on gfe connect and disconnect
  5. (n) create channel and generate token for meeting
  6. (n) notify app to join the meeting

- ### v1.0.17 - 5-Sep-2022

  1. (i) gfe filter by user role
  2. (i) patient filter by user role
  3. (i) gfe queued filter fix

- ### v1.0.16 - 5-Sep-2022

  1. (i) added customerid in gfe response
  2. (i) add treaments array instead of treatmentid array
  3. (i) increase limit of address of customer in dbschema and joi

- ### v1.0.15 - 3-Sep-2022

  1. (n) fetch gfe queue
  2. (n) add pusher package
  3. (n) add pusher events (ON_GFE_CONNECT, ON_GFE_DICONNECT, ON_GFE_JOINED)

- ### v1.0.14 - 1-Sep-2022

  1. (i) fetch gfes according to roles
  2. (f) add permission in provider contract submission token

- ### v1.0.13 - 31-Aug-2022

  1. (n) add patient api
  2. (n) fetch patient api
  3. (n) add gfe api
  4. (n) fetch gfe api

- ### v1.0.12 - 27-Aug-2022

  1. (n) add category api
  2. (n) add treatment api
  3. (n) get/filter category api
  4. (n) get/filter treatment api
  5. (f) fix contract is submitting multiple times
  6. (n) filter director api

- ### v1.0.11 - 26-Aug-2022

  1. (n) add customer contract api
  2. (n) add provider contract api
  3. (n) add director contract api
  4. (n) add director api
  5. (n) get director api

- ### v1.0.10 - 25-Aug-2022

  1. (i) updated contract template
  2. (n) file uploading api
  3. (n) file fetch api
  4. (f) fix token sending while sending contract through email

- ### v1.0.9 - 24-Aug-2022

  1. (f) added field isContractSubmitted in provider and customer
  2. (f) mark status api of customer and provider

- ### v1.0.8 - 24-Aug-2022

  1. (f) added node mailer packager
  2. (f) implement mailing functionality
  3. (i) move queries utils to queries.utils
  4. (f) add template builder and templates

- ### v1.0.7 - 23-Aug-2022

  1. (f) filter customer api
  2. (f) filter provider api
  3. (i) update readme file. change in descending order

- ### v1.0.6 - 23-Aug-2022

  1. (f) change controller from class to functions modules (because of singleton object)
  2. (i) model schema changes in customer model
  3. (f) remove password from customer and provider model coz password will not be set at the time of sign up or user creation
  4. (i) some refactoring...
  5. (f) get customer api
  6. (f) get provider api

- ### v1.0.5 - 22-Aug-2022

  1. (f) password hashing using bcrypt

- ### v1.0.4 - 22-Aug-2022

  1. (i) fix spelling of custoemr to customer
  2. (i) added handy tool helmet, compression

- ### v1.0.3 - 21-Aug-2022

  1. (f) customer create api

- ### v1.0.2 - 21-Aug-2022

  1. (i) seperate queries files
  2. (f) provider create api

- ### v1.0.1 - 20-Aug-2022

  1. (f) project architecture
  2. (f) authentication using JWT
  3. (f) login api
  4. (f) set each required permission to each endpoint

- ### v1.0.0 - 19-Aug-2022

  1. Initial Commit. Code is in Development.
