var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLNull = require('graphql').GraphQLNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var logoElementType = new GraphQLObjectType({
    name: 'logoElement',
    fields: function () {
        return {
            elementType: {
                type: GraphQLString
            },
            offsetLeft: {
                type: GraphQLFloat
            },
            offsetTop: {
                type: GraphQLFloat
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            url: {
                type: GraphQLString
            },
            length: {
                type: GraphQLFloat
            },
            width: {
                type: GraphQLFloat
            }
        }
    }
});

const logoElementInput = new GraphQLInputObjectType({
    name: 'logoElementInput',
    fields: function () {
        return {
            elementType: {
                type: GraphQLNonNull(GraphQLString)
            },
            offsetLeft: {
                type: GraphQLNonNull(GraphQLFloat)
            },
            offsetTop: {
                type: GraphQLNonNull(GraphQLFloat)
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            url: {
                type: GraphQLString
            },
            length: {
                type: GraphQLFloat
            },
            width: {
                type: GraphQLFloat
            }
        }
    }
});

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            user: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            length: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            elements: {
                type: GraphQLList(logoElementType)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderThickness: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var deleteInfo = new GraphQLObjectType({
    name: "deleteInfo",
    fields: function () {
        return {
            n: {
                name: "n",
                type: GraphQLInt
            },
            ok: {
                name: "ok",
                type: GraphQLInt
            },
            deletedCount: {
                name: "deletedCount",
                type: GraphQLInt
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            getAllLogos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            getUserLogos: {
                type: new GraphQLList(logoType),
                args: {
                    user: {
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logos = LogoModel.find({ user: params.user }).exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            getLogoByID: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    user: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    length: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    elements: {
                        type: new GraphQLList(logoElementInput)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderThickness: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    user: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    length: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    elements: {
                        type: new GraphQLList(logoElementInput)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderThickness: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { user: params.user, name: params.name, length: params.length, width: params.width, elements: params.elements,
                        backgroundColor: params.backgroundColor, borderColor: params.borderColor, borderRadius: params.borderRadius, borderThickness: 
                        params.borderThickness, padding: params.padding, margin: params.margin, lastUpdate: new Date() }, 
                        function (err) {
                            if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            },
            removeAllLogos: { 
                type: deleteInfo,
                resolve: function () {
                    const details = LogoModel.deleteMany({}, {});
                    if (!details) {
                        throw new Error('Error')
                    }
                    return details
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });