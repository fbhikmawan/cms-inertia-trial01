# Laravel CMS using InertiaJS - Trial 01

This a Sandbox to try build a CMS web app using InertiaJS of Laravel 10<br>Feel free to modify.

------------
<br>

## DEVELOPMENT Setup
On fresh cloned local repository, please follow Step 0 until 2.<br>After that, you only follow Step 3 until 4.

(-) Clone the repository to your local.

(0) Set the .env file according to your docker container settings. You can use .env.example for reference.

(1) Run below script to install packages using the composer by the help of docker.
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```

--wait until the composer done install all the packages--

(2) Run below script to create the docker container using the Laravel Sail.
```
./vendor/bin/sail up
```

--wait until the Laravel Sail done install and start the docker container--

If you encounter a build error related to port usage, please change those respective ports on the .env file.

(3) Run below script to create the app key.
```
./vendor/bin/sail artisan key:generate
```

(4) Run below script to create the database structure
```
./vendor/bin/sail artisan migrate
```

(5) Run below script to install nodejs packages dependencies
```
./vendor/bin/sail npm install
```

(6) Run below script to make Vite Development server is working
```
./vendor/bin/sail npm run dev
```


(7) To access the site, refer the APP_PORT setting in .env file.
URL will be: http://localhost:{APP_PORT}

------------
<br>

## DEPLOYMENT Setup

Prepare your server:

(-) Make sure your server meets the minimum requirements as described in https://laravel.com/docs/10.x/deployment#server-requirements

(-) Clone the repository to your server at your desired folder. Lets say on folder "`\srv\`". Then, the repository full path will be "`\srv\cms-inertia-trial01`".

Begin to deploy the app:

(0) Set the .env file according to your server environtment. You can use .env.example for reference.

(1) Run below script to install composer dependencies
```
composer install
```

(2) Run below script to create the app key.
```
php artisan key:generate
```

(3) Update the folder permission for Laravel's logging activities. Webserver user and group depend on your webserver and your OS. To figure out what's your web server user and group use the following commands.

For NGINX use:
```
ps aux|grep nginx|grep -v grep
```
Then update the owner and permission.<br>
The string 'www-data' below is taken from script above.
```
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
```
```
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

(4) Create the nginx configuration file named "`example.com`" to the folder "`/etc/nginx/sites-available`"
```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    root /home/{your_username}/srv/cms-inertia-trial01/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

(5) Create a link those config file to NGINX site-enable:
```
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

(6) Check the overall NGINX configuration files:
```
sudo nginx -t
```
Ensure the return status is OK.

(7) Restart the NGINX service:
```
sudo nginx -s reload
```
