CREATE DATABASE IF NOT EXISTS `gfe_system_db`;

USE `gfe_system_db`;

DROP TABLE IF EXISTS `Advertisement`;

DROP TABLE IF EXISTS `UserOtps`;

DROP TABLE IF EXISTS `PatientMedicalHistory`;

DROP TABLE IF EXISTS `Manufactures`;

DROP TABLE IF EXISTS `GfeTreatmentQuestions`;

DROP TABLE IF EXISTS `GfeTreatments`;

DROP TABLE IF EXISTS `CustomerTreatments`;

DROP TABLE IF EXISTS `TreatmentQuestions`;

DROP TABLE IF EXISTS `Questions`;

DROP TABLE IF EXISTS `CustomerTreatments`;

DROP TABLE IF EXISTS `CustomerLocations`;

DROP TABLE IF EXISTS `GfeViews`;

DROP TABLE IF EXISTS `Gfes`;

DROP TABLE IF EXISTS `Patients`;

DROP TABLE IF EXISTS `CustomerMedicalDirectors`;

DROP TABLE IF EXISTS `Customers`;

DROP TABLE IF EXISTS `Providers`;

DROP TABLE IF EXISTS `Directors`;

DROP TABLE IF EXISTS `Locations`;

DROP TABLE IF EXISTS `Users`;

DROP TABLE IF EXISTS `Roles`;

DROP TABLE IF EXISTS `SystemParameters`;

DROP TABLE IF EXISTS `Treatments`;

DROP TABLE IF EXISTS `Categories`;

DROP TABLE IF EXISTS `Compliances`;

DROP TABLE IF EXISTS `Payments`;

DROP TABLE IF EXISTS `InvoiceDetails`;

DROP TABLE IF EXISTS `Invoices`;

CREATE TABLE `SystemParameters` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `key` NVARCHAR(100) UNIQUE,
    `value` NVARCHAR(1000),
    `isActive` BIT
);

CREATE TABLE `Roles` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `role` nvarchar(100),
    `permissions` nvarchar(5000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `Users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` nvarchar(100),
    `username` NVARCHAR(100),
    `password` nvarchar(100),
    `roleId` INT,
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isActive` BIT,
    `isdeleted` BIT,
    FOREIGN KEY (roleId) REFERENCES Roles(id)
);

CREATE TABLE `Providers` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `firstname` NVARCHAR(100),
    `lastname` NVARCHAR(100),
    `phone` NVARCHAR(100),
    `userId` INT,
    `address` NVARCHAR(1000),
    `licenseInfo` NVARCHAR(1000),
    `status` nvarchar(50),
    `isContractSubmitted` BIT,
    `contract` nvarchar(300),
    `signature` nvarchar(300),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE `Customers` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userId` INT,
    `companyName` nvarchar(100),
    `contactName` nvarchar(100),
    `companyphone` nvarchar(100),
    `dbaName` nvarchar(100),
    `businessWebsite` nvarchar(100),
    `multipleLocations` BIT,
    `billingContactName` nvarchar(100),
    `billingContactNumber` nvarchar(100),
    `medicalGroup` nvarchar(2000),
    `status` nvarchar(50),
    `isContractSubmitted` BIT,
    `contract` nvarchar(300),
    `signature` nvarchar(300),
    `subscriptionType` nvarchar(300),
    `gracePeriod` INT,
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE `CustomerMedicalDirectors` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userId` INT,
    `customerId` INT,
    `firstname` VARCHAR(100),
    `lastname` VARCHAR(100),
    `phone` VARCHAR(100),
    `licenseType` VARCHAR(100),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (customerId) REFERENCES Users(id)
);

CREATE TABLE `Directors` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userId` INT,
    `firstname` nvarchar(100),
    `lastname` nvarchar(100),
    `address` nvarchar(100),
    `licenseType` nvarchar(100),
    `medicalLicenseNumber` nvarchar(100),
    `amount` DECIMAL(10, 2),
    `frequency` nvarchar(100),
    `comment` nvarchar(10000),
    `status` nvarchar(50),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE `Locations`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(100),
    `type` NVARCHAR(100),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `CustomerLocations`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `customerId` INT,
    `stateId` INT,
    `streetname` NVARCHAR(100),
    `appartmentNumber` NVARCHAR(100),
    `city` NVARCHAR(100),
    `zip` NVARCHAR(100),
    `fee` DECIMAL(10, 3),
    `gfeFee` DECIMAL(10, 3),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (customerId) REFERENCES Users(id)
);

CREATE TABLE `Categories`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(100),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `Questions` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `text` NVARCHAR(500),
    `yesScore` INT,
    `noScore` INT,
    `approvedConditionalIndicator` NVARCHAR(1),
    `approvedConditionalText` NVARCHAR(500),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `Treatments`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(100),
    `categoryid` INT,
    `deferText` NVARCHAR(4000),
    `deniedText` NVARCHAR(4000),
    `approvedText` NVARCHAR(4000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (categoryid) REFERENCES Categories(id)
);

CREATE TABLE `TreatmentQuestions`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `treatmentId` INT,
    `questionId` INT,
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (`treatmentId`) REFERENCES `Treatments`(id),
    FOREIGN KEY (`questionId`) REFERENCES `Questions`(id)
);

CREATE TABLE `CustomerTreatments` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `customerId` INT,
    `treatmentId` INT,
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (customerId) REFERENCES Users(id),
    FOREIGN KEY (treatmentId) REFERENCES Treatments(id)
);

CREATE TABLE `Manufactures` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `treatmentId` INT,
    `websiteUrl` NVARCHAR(500),
    `dosage` NVARCHAR(4000),
    `contraindication` NVARCHAR(4000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (treatmentId) REFERENCES Treatments(id)
);

CREATE TABLE `Patients` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `firstname` NVARCHAR(100),
    `lastname` NVARCHAR(100),
    `dob` DATE,
    `email` NVARCHAR(352),
    `medications` NVARCHAR(2000),
    `allergies` NVARCHAR(2000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `Gfes`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `status` NVARCHAR(20),
    `patientId` INT,
    `customerLocationId` INT,
    `startedAt` TIMESTAMP,
    `completedBy` INT,
    `completedAt` TIMESTAMP,
    `reviewedBy` INT,
    `reviewedAt` TIMESTAMP,
    `directorComment` NVARCHAR(5000),
    `providerComment` NVARCHAR(5000),
    `clinicalConsideration` NVARCHAR(5000),
    `bookingDate` TIMESTAMP,
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (patientId) REFERENCES Patients(id),
    FOREIGN KEY (completedBy) REFERENCES Users(id)
);

CREATE TABLE `GfeViews`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `gfeId` INT,
    `viewedBy` INT,
    `viewedAt` TIMESTAMP,
    `createdat` TIMESTAMP,
    FOREIGN KEY (gfeId) REFERENCES Gfes(id),
    FOREIGN KEY (viewedBy) REFERENCES Users(id)
);

CREATE TABLE `GfeTreatments` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `gfeId` INT,
    `treatmentId` INT,
    `status` NVARCHAR(100),
    `statusText` NVARCHAR(4000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (gfeId) REFERENCES Gfes(id),
    FOREIGN KEY (treatmentId) REFERENCES Treatments(id)
);

CREATE TABLE `GfeTreatmentQuestions` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `gfeId` INT,
    `questionId` INT,
    `text` VARCHAR(500),
    `approvedConditionalIndicator` VARCHAR(500),
    `approvedConditionalText` VARCHAR(500),
    `answer` NVARCHAR(500),
    `score` INT,
    `comment` VARCHAR(500),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (gfeId) REFERENCES Gfes(id),
    FOREIGN KEY (questionId) REFERENCES Questions(id)
);

CREATE TABLE `PatientMedicalHistory` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `patientId` INT,
    `key` NVARCHAR(500),
    `value` NVARCHAR(500),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (patientId) REFERENCES Patients(id)
);

CREATE TABLE `Compliances` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` NVARCHAR(500),
    `text` NVARCHAR(1000),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `Invoices`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `customerId` INT,
    `currency` VARCHAR(20),
    `duedate` TIMESTAMP,
    `invoiceDate` TIMESTAMP,
    `discount` DECIMAL(10, 3),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `InvoiceDetails` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `invoiceId` INT,
    `type` VARCHAR(20),
    `refId` INT,
    `amount` DECIMAL(10, 3),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT,
    FOREIGN KEY (invoiceId) REFERENCES Invoices(id)
);

CREATE TABLE `Payments`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `amount` DECIMAL(10, 3),
    `invoiceId` INT,
    `method` VARCHAR(50),
    `type` VARCHAR(50),
    `createdby` INT,
    `createdat` TIMESTAMP,
    `updatedby` INT,
    `updatedat` TIMESTAMP,
    `isdeleted` BIT
);

CREATE TABLE `UserOtps`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `userId` INT,
    `token` NVARCHAR(100),
    `createdat` TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE `Advertisement` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `customerId` INT NULL,
    `text` TEXT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_advertisement_customer_id_idx` (`customerId` ASC) VISIBLE,
    CONSTRAINT `fk_advertisement_customer_id` FOREIGN KEY (`customerId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO
    `SystemParameters` (`key`, `value`, `isActive`)
VALUES
    (
        'owner_signature',
        '/api/file/owner_signature.jpg',
        1
    );

INSERT INTO
    `Roles` (
        `role`,
        `permissions`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        'Admin',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'Customer',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'Provider',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'Medical Director',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'Clinical Director',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'Customer Medical Director',
        'ADMIN_DASHBOARD,CATEGORY_CREATE,CATEGORY_FETCH,CATEGORY_UPDATE,CATEGORY_DELETE,COMPLIANCE_CREATE,COMPLIANCE_FETCH,COMPLIANCE_UPDATE,COMPLIANCE_DELETE,CUSTOMER_CREATE,CUSTOMER_FETCH,CUSTOMER_UPDATE,CUSTOMER_DELETE,CUSTOMER_CONTRACT_CREATE,CUSTOMER_CONTRACT_FETCH,CUSTOMER_STATUS_MARK,CUSTOMER_DASHBOARD,DIRECTOR_CREATE,DIRECTOR_FETCH,DIRECTOR_UPDATE,DIRECTOR_DELETE,DIRECTOR_STATUS_MARK,GFE_CREATE,GFE_FETCH,GFE_UPDATE,GFE_DELETE,GFE_ENQUEUE,GFE_DEQUEUE,GFE_QUESTION_CREATE,GFE_QUESTION_ANSWER_CREATE,GFE_STATUS_MARK,GFE_SCHEDULE,INVOICE_CREATE,INVOICE_CREATE_DISCOUNT,INVOICE_FETCH,MANUFACTURER_CREATE,MANUFACTURER_FETCH,MANUFACTURER_UPDATE,MANUFACTURER_DELETE,PATIENT_CREATE,PATIENT_FETCH,PATIENT_UPDATE,PATIENT_DELETE,PROVIDER_CREATE,PROVIDER_FETCH,PROVIDER_UPDATE,PROVIDER_DELETE,PROVIDER_CONTRACT_CREATE,PROVIDER_CONTRACT_FETCH,PROVIDER_STATUS_MARK,PROVIDER_DASHBOARD,TREATMENT_CREATE,TREATMENT_FETCH,TREATMENT_UPDATE,TREATMENT_DELETE,LOCATION_CREATE,LOCATION_FETCH,LOCATION_UPDATE,LOCATION_DELETE,CUSTOMER_TREATMENTS_SAVE,CUSTOMER_TREATMENTS_FETCH,TREATMENT_QUESTION_SAVE,GFE_REVIEW,CHANGE_PASSWORD,DIRECTOR_MEDICAL_FETCH,CUSTOMER_RESEND,CUSTOMER_INVOICING,INVOICE_UPDATE,END_CALL,GFE_REPORT,GFE_DASHBOARD,PROVIDER_COUNT,CUSTOMER_COUNT,PATIENT_ONLINE,PROVIDER_PING,PROVIDER_ONLINE,PAYMENT_CREATE,PAYMENT_FETCH,ADVERTISEMENT_CREATE,ADVERTISEMENT_FETCH,QUESTION_CREATE,QUESTION_FETCH,QUESTION_FETCH,QUESTION_UPDATE,QUESTION_DELETE,GFE_JOIN',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Users` (
        `email`,
        `username`,
        `password`,
        `roleId`,
        `createdby`,
        `createdat`,
        `isActive`,
        `isdeleted`
    )
VALUES
    (
        'admin@gfe.com',
        'admin',
        '$2b$08$Ji4UMpQ0vq9O7E1M97pkEubFzF/VTb9VdT1j8yO7iTQEAPUe072Oa',
        -- 123
        1,
        1,
        UTC_TIMESTAMP(),
        1,
        0
    ),
    (
        'customer@gfe.com',
        'customer123',
        '$2b$08$Ji4UMpQ0vq9O7E1M97pkEubFzF/VTb9VdT1j8yO7iTQEAPUe072Oa',
        -- 123
        2,
        1,
        UTC_TIMESTAMP(),
        1,
        0
    ),
    (
        'provider@gfe.com',
        'provider123',
        '$2b$08$Ji4UMpQ0vq9O7E1M97pkEubFzF/VTb9VdT1j8yO7iTQEAPUe072Oa',
        -- 123
        3,
        1,
        UTC_TIMESTAMP(),
        1,
        0
    ),
    (
        'customerdirector@gfe.com',
        'provider123',
        '$2b$08$Ji4UMpQ0vq9O7E1M97pkEubFzF/VTb9VdT1j8yO7iTQEAPUe072Oa',
        -- 123
        6,
        1,
        UTC_TIMESTAMP(),
        1,
        0
    ),
    (
        'medicaldirector@gfe.com',
        'medicaldirector',
        '$2b$08$Ji4UMpQ0vq9O7E1M97pkEubFzF/VTb9VdT1j8yO7iTQEAPUe072Oa',
        -- 123
        4,
        1,
        UTC_TIMESTAMP(),
        1,
        0
    );

INSERT INTO
    `Customers` (
        `userId`,
        `companyName`,
        `contactName`,
        `companyphone`,
        `dbaName`,
        `businessWebsite`,
        `multipleLocations`,
        `billingContactName`,
        `billingContactNumber`,
        `medicalGroup`,
        `status`,
        `isContractSubmitted`,
        `contract`,
        `signature`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        2,
        'test',
        'test',
        '123456789',
        'dba name test',
        'business website test',
        1,
        'billing contact name test',
        'billing contact number test',
        '{"firstname":"medical","lastname":"director","phone":"123456789","email":"medical@asd.com","licenseType":"MD"}',
        'approved',
        1,
        'https://gfe-api-dev.gocbeglobal.com/api/file/96805f30-3f12-11ed-a6fe-cb0f90cfb15d.pdf',
        'https://gfe-api-dev.gocbeglobal.com/api/file/961393a0-3f12-11ed-a6fe-cb0f90cfb15d.png',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `CustomerMedicalDirectors` (
        `userId`,
        `customerId`,
        `firstname`,
        `lastname`,
        `phone`,
        `licenseType`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        4,
        2,
        'customer',
        'director',
        '12346789',
        'MD',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Providers` (
        `userId`,
        `firstname`,
        `lastname`,
        `phone`,
        `address`,
        `licenseInfo`,
        `status`,
        `isContractSubmitted`,
        `contract`,
        `signature`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        3,
        'John',
        'Smith',
        '123456789',
        'california',
        'RE',
        'approved',
        1,
        'https://gfe-api-dev.gocbeglobal.com/api/file/96805f30-3f12-11ed-a6fe-cb0f90cfb15d.pdf',
        'https://gfe-api-dev.gocbeglobal.com/api/file/961393a0-3f12-11ed-a6fe-cb0f90cfb15d.png',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Categories` (
        `name`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        'category 1',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'category 2',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Treatments` (
        `name`,
        `categoryid`,
        `deferText`,
        `deniedText`,
        `approvedText`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        'treatment1c1',
        1,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'treatment2c1',
        1,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'treatment3c1',
        1,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'treatment1c2',
        2,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'treatment2c2',
        2,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'treatment3c2',
        2,
        'this is defer text',
        'this is denied text',
        'this is approved text',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Locations` (
        `name`,
        `type`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        'location 1',
        'state',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        'location 2',
        'state',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `CustomerLocations` (
        `customerId`,
        `stateId`,
        `streetname`,
        `appartmentNumber`,
        `city`,
        `zip`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
VALUES
    (
        2,
        1,
        'street 1',
        'appartment 1',
        'city',
        'zipcode',
        1,
        UTC_TIMESTAMP(),
        0
    ),
    (
        2,
        2,
        'street 2',
        'appartment 2',
        'city',
        'zipcode',
        1,
        UTC_TIMESTAMP(),
        0
    );

INSERT INTO
    `Directors` (
        `userId`,
        `firstname`,
        `lastname`,
        `address`,
        `licenseType`,
        `medicalLicenseNumber`,
        `amount`,
        `frequency`,
        `comment`,
        `status`,
        `createdby`,
        `createdat`,
        `isdeleted`
    )
SELECT
    5,
    'John Medical',
    'Director',
    'addressssss',
    'MD',
    'LA123',
    '100',
    '123',
    'this is comment',
    'approved',
    1,
    UTC_TIMESTAMP(),
    0;