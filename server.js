const http = require('http');
const fs = require('fs')

const hostname = '0.0.0.0';
const port = 3500;

const homePage = fs.readFileSync('main.html')
const aboutPage = fs.readFileSync('about.html')

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url == '/'){
        res.write(homePage)
    } else if (req.url == '/about'){
        res.write(aboutPage)
    }else if (req.url.match(/images/g)){
        try{
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpeg");
            imgLoc = req.url.replace('/', '../')
            image = fs.readFileSync(imgLoc)
            res.end(image);
        } catch {
            res.statusCode = 404;
            res.write("404");
            console.log(req.url)
        }
    } else {
        res.write('404')
    }
    res.end();
});

server.listen(port, hostname, () => {
    console.log('Server is now running');
});