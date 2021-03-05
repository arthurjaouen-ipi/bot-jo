const athletes = require("./athletes.json")
const pays = require("./pays.json")
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/', (request, response) => {
  const action = request.body.action
  let res = ""
  
  switch (action) {
    case 'infos-athlete':
      res = request.body.athlete+" ("+athletes[request.body.athlete].pays+"), a "+athletes[request.body.athlete].age+" ans et mesure "+athletes[request.body.athlete].taille+" cm pour "+athletes[request.body.athlete].poids+" kg."
      res += "  Pratiquant le "+athletes[request.body.athlete].discipline+", il/elle a "+(athletes[request.body.athlete].medailles.or+athletes[request.body.athlete].medailles.argent+athletes[request.body.athlete].medailles.bronze)+" médailles à son actif."
      response.json(
        { text: res }
      )
      break;
    case 'infos-pays':
      res = request.body.pays+" :"+pays[request.body.pays].flag+": compte "+pays[request.body.pays].nbrAthlete+" athlètes dans sa délégation, a remporté "+(pays[request.body.pays].medailles.total)+" médailles"
      res += " et a terminé à la "+((pays[request.body.pays].Classement == 1)?"1ère":pays[request.body.pays].Classement+"ème")+" place."
      response.json(
        { text: res }
      )
    default:
      response.json(
        { text: "Je ne suis pas sûr d'avoir la réponse..."})
  }
});

const listener = app.listen(process.env.PORT, () => {} )