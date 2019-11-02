'use strict';
module.exports = (sequelize, DataTypes) => {
    const fotografia = sequelize.define('fotografia', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        author: DataTypes.STRING,
        private: DataTypes.INTEGER,
        user_creation: DataTypes.STRING
    }, {});
    fotografia.associate = function(models) {
        // associations can be defined here
    };
    return fotografia;
};