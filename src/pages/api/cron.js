export default function handler(req, res) {
    console.log('Chegamos aqui')
    res.status(200).end('Hello Cron!');
}