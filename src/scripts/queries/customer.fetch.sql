SELECT
    U.`id`,
    C.`contactName`,
    C.`companyPhone` as companyPhone,
    U.`email` as companyEmail,
    R.`role` as type,
    C.`companyName`,
    C.`dbaName`,
    C.`businessWebsite`,
    CAST(C.`multipleLocations` as SIGNED) as multipleLocations,
    C.`billingContactName`,
    C.`billingContactNumber`,
    C.`medicalGroup`,
    C.`status`,
    CAST(C.`isContractSubmitted` as SIGNED) as isContractSubmitted,
    C.`contract`,
    C.`signature`,
    C.`gracePeriod`,
    C.`subscriptionType`,
    C.`createdby`,
    C.`createdat`,
    C.`updatedby`,
    C.`updatedat`
FROM
    customers C
    join Users U on C.userId = U.id
    join Roles R on U.roleId = R.id
WHERE
    U.id = :id
    AND U.isdeleted = 0
    AND C.isdeleted = 0
    AND R.isdeleted = 0;