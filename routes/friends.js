const express = require('express');
const FriendsService = require('../services/friends');
//los routes solo se encargan de redireccionar y pasarle la data a los services para que ellos hagan sus operaciones y la devuelvan
//los routes no llevan logica
function friendsApi(app){
    const router = express.Router();
    app.use('/api/friends', router);

    const friendsService = new FriendsService();

    router.get('/', async function(req, res, next){
        const { tags } = req.query;
        try {
            const friends = await friendsService.getFriends({ tags });
 
            res.status(200).json({
                data: friends,
                message:'friends listed'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve la lista amigos agregados

    router.get('/:friendId', async function(req, res, next){
        const { friendId } = req.params;
        try {
            const friends = await friendsService.getFriend({ friendId });
 
            res.status(200).json({
                data: friends,
                message:'friend retrieved'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un jugador buscado para agregarlo

    router.post('/', async function(req, res, next){
        const { body: friend } = req;
        try {
            const sendFriendRequestId = await friendsService.sentFriendRequest({ friend });
 
            res.status(201).json({
                data: sendFriendRequestId,
                message:'invitation send'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un jugador al que le hemos enviado la solicitud de amistad

    router.delete('/:friendId', async function(req, res, next){
        const { friendId } = req.params;

        try {
            
            const deletedFriendId = await friendsService.deletedFriend({ friendId });
            res.status(200).json({
                data: deletedFriendId,
                message:'deleted friend'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve un amigo al que hemos eliminado

    router.put('/:friendId', async function(req, res, next){
        const { friendId } = req.params;
        const { body: friend} = req
        try {
            const updatedFriendId = await friendsService.updateFriend({ friendId, friend });
            res.status(200).json({
                data: updatedFriendId,
                message:'friend updated'
            })
        } catch (error) {
            next(error);
        }
    });// devuelve a un amigo modificado
}

module.exports = friendsApi;