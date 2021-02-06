// docker ps
// docker exec -it <container_id> mongo -u <user> -p <password> --authenticationDatabase herois
marks
docker exec -it e600c980c953 mongo -u marks -p minhasenhasecreta --authenticationDatabase herois
show dbs

use herois

show collections

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento:'1998-01-01'
})

db.herois.find()

db.herois.update({_id: ObjectId()}, {nome: 'Mulher Maravilha'})

db.herois.remove({})