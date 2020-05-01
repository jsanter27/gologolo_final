# CSE 316 Project 3

Created by Justin Santer

goLogoLo Logo-maker (MERN stack application)

## Example GraphiQL Queries

### Getting all the logos and all their info

```
query{
    logos{
        _id
        text
        color
        fontSize
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        lastUpdate
    }
}
```

### Getting a single logo's info by ID

```
query{
    logo(id:"[Logo ID Here]"){
        _id
        text
        color
        fontSize
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        lastUpdate
    }
}
```

### Adding a logo to the database (with default values)

```
mutation{
    addLogo(
        text:"goLogoLo Logo",
        color:"#FF0000",
        fontSize:24,
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
```

### Updating a logo by ID

```
mutation{
    updateLogo(
        id:"[Logo ID Here]"
        text:"New Logo Text", # Updating text from previous example
        color:"#FF0000",
        fontSize:24,
        backgroundColor:"#FFFFFF",
        borderColor:"#000000",
        borderRadius:12,
        borderThickness:12,
        padding:12,
        margin:0
    ){
        lastUpdate 
    }
}
```

### Removing a logo by ID

```
mutation{
    removeLogo(id:"[Logo ID Here]"){
        _id
    }
}
```