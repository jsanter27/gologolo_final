# CSE 316 Project 3

Created by Justin Santer

goLogoLo Logo-maker (MERN stack application)

## GOLOGOLO QUERIES

### Getting all the users in the database (for testing purposes):

`
query{
  getAllUsers{
    _id
    username
    password
    resetPasswordToken
    resetPasswordExpires
  }
}
`

### Getting a single user by resetPasswordToken (for password recovery):

`
query{
  getUserByToken(resetPasswordToken:"[TOKEN HERE]"){
    username
    password
  }
}
`

### Getting all the logos in the database (for testing purposes):

`
query{
    getAllLogos{
        _id
        user
        name
        length
        width
        elements{
	    elementType
            offsetLeft
            offsetTop
            text
            color
            fontSize
            url
            length
            width
	}
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        lastUpdate
    }
}
`

### Getting all the logos of a specific user:

`
query{
    getUserLogos(user:"[Username Here]"){
        _id
        user
        name
        length
        width
        elements{
	    elementType
            offsetLeft
            offsetTop
            text
            color
            fontSize
            url
            length
            width
	}
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        lastUpdate
    }
}
`

### Getting a logo from a user by ID:

`
query{
    getLogoByID(id:"[Logo ID Here]"){
        _id
        user
        name
        length
        width
	elements{
	    elementType
            offsetLeft
            offsetTop
            text
            color
            fontSize
            url
            length
            width
	}
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        lastUpdate
    }
}
`

### Add a logo to the database with example values:

`
mutation{
    addLogo(
        user:"[Username Here]"
        name:"goLogoLo Logo",
        length:400,
        width:800,
        elements:[
            {
            elementType: "Image",
            offsetLeft: 100,
            offsetTop: 100,
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1920px-SNice.svg.png",
            length: 100,
            width: 100
            },
	    {
	    elementType: "Text",
	    offsetLeft: 50,
            offsetTop: 200,
            text: "goLogoLo Logo",
            color: "#FF0000",
	    fontSize: 24
            }
	],
        backgroundColor:"#FFFFFF",
        borderColor:"#000000",
        borderRadius:12,
        borderThickness:12,
        padding:12,
        margin:0
    ){
        _id 
    }
}
`

### Update a logo in the database with example values:

`
mutation{
    updateLogo(
        id:"[Logo ID Here]",
        user:"[Username Here]",
        name:"goLogoLo Logo",
        length:400,
        width:800,
        elements:[
            {
            elementType: "Image",
            offsetLeft: 100,
            offsetTop: 100,
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1920px-SNice.svg.png",
            length: 100,
            width: 100
            },
	    {
	    elementType: "Text",
	    offsetLeft: 50,
            offsetTop: 200,
            text: "goLogoLo Logo",
            color: "#FF0000",
	    fontSize: 24
            }
	],
        backgroundColor:"#F123FF", # Change the value from the previous example
        borderColor:"#000000",
        borderRadius:12,
        borderThickness:12,
        padding:12,
        margin:0
    ){
        lastUpdate 
    }
}
`

### Removing a logo by User and ID:

`
mutation{
    removeLogo(id:"[Logo ID Here]"){
        _id
    }
}
`

### Update a user's password with a new one:

`
mutation{
   changeUserPassword(id:"[ID HERE]", password:"[NEW PASSWORD]"){
       _id
       username
       password
       resetPasswordToken
       resetPasswordExpires
   }
}
`

### Clear all logos from the database (for testing purposes):

`
mutation{
    removeAllLogos{
        n
        ok
        deletedCount
    }
}
`

### Clear all users from the database (for testing purposes):

`
mutation{
    removeAllUsers{
        n
        ok
        deletedCount
    }
}
`