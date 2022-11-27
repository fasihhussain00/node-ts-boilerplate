SELECT
    U.`id`,
    U.`email`,
    U.`username`,
    R.`role` as type,
    U.`password`,
    R.`permissions`,
    U.`createdby`,
    U.`createdat`,
    U.`updatedby`,
    U.`updatedat`,
    CAST(U.`isActive` as SIGNED) as isActive
FROM
    `Users` as U
    JOIN `Roles` as R ON U.roleId = R.id
    and R.isdeleted = 0
    and U.isdeleted = 0
where
    `email` = :emailorusername
    OR `username` = :emailorusername