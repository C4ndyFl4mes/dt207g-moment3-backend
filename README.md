# CV-API
Det här är ett REST API skriven i JavaScript med Express för att hantera olika CV-poster. Den har funktioner för CRUD.
## Länk
Webbsidan där API:et kan testas: [Webbsida](https://dt207g-moment3-frontend.netlify.app/)
Men API:et ligger på Render, men inte databasen (på Atlas), vilket betyder att man måste gå in på [API-länken](https://dt207g-moment3-backend.onrender.com/cv) så att Render startar upp den.
## Databas
API:et använder en databas i MongoDB som består av en tabell, CV, med följande fält:
```JSON
{
  "_id": "objectId",
  "companyname": "string",
  "jobtitle" :"string",
  "location": "string",
  "startdate": "string",
  "enddate" :"string",
  "description": "string"
}
```
## Användning
API:et har fyra olika metoder: `GET`, `POST`, `PUT` och `DELETE`. `GET` kan inte hämta enskild CV-post utan den hämtar hela listan. `POST` och `PUT` och använder body i anropet för de olika egenskaperna/fälten beskrivna ovan.
<table>
  <tr>
    <th>Metod</th>
    <th>Ändpunkt</th>
    <th>Body</th>
    <th>Beskrivning</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/cv</td>
    <td>Tom</td>
    <td>Hämtar alla CV-poster</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/cv</td>
    <td>"companyname", "jobtitle", "location", "startdate", "enddate", "description"</td>
    <td>Lägger till en CV-post</td>
  </tr>
  <tr>
    <td>PUT</td>
    <td>/cv/:id</td>
    <td>"companyname", "jobtitle", "location", "startdate", "enddate", "description"</td>
    <td>Uppdaterar en CV-post</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/cv/:id</td>
    <td>"Tom"</td>
    <td>Raderar en CV-post</td>
  </tr>
</table>
Error meddelanden skickas i detta format:

```json
{
    "valid": false,
    "message": {
        "header": "Rubrik",
        "message": "Förtydligande"
    }
}
```

### Exempel
Uppdatera en rad. Där `this.URL` är addressen till API:et och `this.header` är enbart `{"content-type": "application/json"};`. Första if-satsen kallar på en privat metod som kontrollerar ifall inmatningsfälten är korrekta, om inte, då returneras ett felmeddelande.

```ts
if (!API.checkFieldsBeforeRequest(item).valid) {
  return API.checkFieldsBeforeRequest(item);
}
const resp: Response | null = await fetch(this.URL+`/${item._id}`, {
    method: "PUT",
    headers: this.header,
    body: JSON.stringify(item)
});
if (!resp) {
    return {valid: false, message: {header: "Respons fel", message: "Fick ingen respons vid ändring."}};
}
const validation: IError = await resp.json();
```
