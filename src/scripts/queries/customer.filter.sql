SELECT
    distinct U.`id`,
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
    C.`gracePeriod`,
    C.`subscriptionType`,
    C.`signature`,
    C.`createdby`,
    C.`createdat`,
    C.`updatedby`,
    C.`updatedat`
FROM
    customers C
    JOIN Users U ON C.userId = U.id
    JOIN Roles R ON U.roleId = R.id
    JOIN customerLocations CL ON CL.customerid = U.id
    AND CL.isdeleted = 0
WHERE
    CL.stateId = COALESCE(:stateid, CL.stateId)
    AND C.status = COALESCE(:status, C.status)
    AND U.isdeleted = 0
    AND C.isdeleted = 0
    AND R.isdeleted = 0;