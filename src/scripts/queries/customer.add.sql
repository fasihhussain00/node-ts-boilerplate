INSERT INTO
    `Users` (
        `email`,
        `roleId`,
        `createdby`,
        `createdat`,
        `updatedby`,
        `updatedat`,
        `isActive`,
        `isdeleted`
    )
SELECT
    :email,
    (
        SELECT
            `id`
        FROM
            `roles`
        WHERE
            `role` = 'Customer'
        LIMIT
            1
    ), NULL,
    UTC_TIMESTAMP(),
    NULL,
    NULL,
    0,
    0
WHERE
    (
        SELECT
            COUNT(id)
        FROM
            Users
        WHERE
            email = :email
            AND isdeleted = 0
    ) = 0;

SET
    @insertedUserId = last_insert_id();

INSERT INTO
    `customers` (
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
        `createdby`,
        `createdat`,
        `updatedby`,
        `updatedat`,
        `isdeleted`
    )
SELECT
    @insertedUserId,
    :companyName,
    :contactName,
    :companyPhone,
    :dbaName,
    :businessWebsite,
    :multipleLocations,
    :billingContactName,
    :billingContactNumber,
    :medicalGroup,
    :status,
    0,
    :createdby,
    UTC_TIMESTAMP(),
    NULL,
    NULL,
    0
WHERE
    (
        SELECT
            COUNT(id)
        FROM
            Users
        WHERE
            id = @insertedUserId
    ) > 0;

SELECT
    @insertedUserId as userId;