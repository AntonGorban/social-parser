const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
});

const Tokens = sequelize.define("tokens", {
  vk: { type: DataTypes.STRING },
  tg: { type: DataTypes.STRING },
  youtube: { type: DataTypes.STRING },
  instLogin: { type: DataTypes.STRING },
  instPassword: { type: DataTypes.STRING },
});

const Parse = sequelize.define("parse", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

const Resources = sequelize.define("resources", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, defaultValue: null },
  vk: { type: DataTypes.STRING, defaultValue: null },
  tg: { type: DataTypes.STRING, defaultValue: null },
  youtube: { type: DataTypes.STRING, defaultValue: null },
  ok: { type: DataTypes.STRING, defaultValue: null },
  inst: { type: DataTypes.STRING, defaultValue: null },
  tw: { type: DataTypes.STRING, defaultValue: null },
});

const ParseInfo = sequelize.define("parse_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dayViews: { type: DataTypes.INTEGER, defaultValue: null },
  dayVisitors: { type: DataTypes.INTEGER, defaultValue: null },
  weekViews: { type: DataTypes.INTEGER, defaultValue: null },
  weekVisitors: { type: DataTypes.INTEGER, defaultValue: null },
  monthViews: { type: DataTypes.INTEGER, defaultValue: null },
  monthVisitors: { type: DataTypes.INTEGER, defaultValue: null },
  vk: { type: DataTypes.INTEGER, defaultValue: null },
  tg: { type: DataTypes.INTEGER, defaultValue: null },
  youtubeSubs: { type: DataTypes.INTEGER, defaultValue: null },
  youtubeViews: { type: DataTypes.INTEGER, defaultValue: null },
  ok: { type: DataTypes.INTEGER, defaultValue: null },
  inst: { type: DataTypes.INTEGER, defaultValue: null },
  tw: { type: DataTypes.INTEGER, defaultValue: null },
});

const ParseUrl = sequelize.define("parse_url", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
});

Users.hasMany(Resources);
Resources.belongsTo(Users);

Users.hasMany(Parse);
Parse.belongsTo(Users);

Resources.hasMany(ParseInfo);
ParseInfo.belongsTo(Resources);

Parse.hasMany(ParseInfo);
ParseInfo.belongsTo(Parse);

Users.hasOne(Tokens);
Tokens.belongsTo(Users);

module.exports = {
  Users,
  Tokens,
  Parse,
  Resources,
  ParseInfo,
  ParseUrl,
};
