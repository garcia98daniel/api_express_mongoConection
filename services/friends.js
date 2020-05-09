// const { friendsMock } = require("../utils/mocks/friends"); //el nombre de la variable debe coinsidir con la variable exportada

const MongoLib = require("../lib/mongo");
// aqui va la toda la logica del software
// los services se encargan de recibir la informacion de las rutas y peticiones 
class FriendsService {

    constructor(){
        this.collection = 'friends';
        this.mongoDB = new MongoLib();
    }

    async getFriends(){
        // const friends = await Promise.resolve(friendsMock); //EJEMPLO MOCK
        const friends = await this.mongoDB.getAll(this.collection);
        return friends || [];
    }

    // async getFriends({ tags }){ EJEMPLO SI QUEREMOS FILTRAR Y QUE NOS DEVUELVA UNA COLECCION DEPENDIENDO EL QUERY
    //     const query = tags && { tags: {$in: tags} }; // si los tags existen entonces dame los tags que estan dentro de los tags que estamos pasando
    //     // const friends = await Promise.resolve(friendsMock); //EJEMPLO MOCK
    //     const friends = await this.mongoDB.getAll(this.collection, query);
    //     return friends || [];
    // }

    async getFriend({ friendId }){
        // const friend = await Promise.resolve(friendsMock[0]); //EJEMPLO MOCK
        const friend = await this.mongoDB.get(this.collection, friendId);
        return friend || {};
    }

    //seria como un create
    async sentFriendRequest({ friend }){
        // const sentFriendRequestId = await Promise.resolve(friendsMock[0].id); //EJEMPLO MOCK
        const sentFriendRequestId = await this.mongoDB.create(this.collection, friend);
        return sentFriendRequestId;
    }

    async updateFriend({ friendId, friend } = {}){ //no lo usamos aqui
        // const sentFriendRequestId = await Promise.resolve(friendsMock[0].id); //EJEMPLO MOCK
        const updateFriendId = await this.mongoDB.update(this.collection, friendId, friend);
        return updateFriendId;
    }

    async deletedFriend({ friendId }){
        // const deletedFriendId = await Promise.resolve(friendsMock[0].id); //EJEMPLO MOCK
        const deletedFriendId = await  this.mongoDB.delete(this.collection, friendId);
        return deletedFriendId;
    }
}

module.exports = FriendsService;