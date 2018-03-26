

## How to init server
```
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install
$ node app.js 
```

## how to start
 ```
  $ npm instll 
  $ npm  build
 ```
 ### Technology 
- How to send http request:
1. Api is a generic REST Api handler;
2. ionic.config.json proxy declaration http host;
- Components dynamic order:
1. ViewContainerRef  instantiate the container;
2. use componentFactoryResolver.resolveComponentFactory to instantiate  dynamic components;
3. container.createComponent to add the dynamic components to the container in order;
4. use [Dragula](https://github.com/bevacqua/dragula) to dynamic ordering of dragging;
- How to refresh or infinite  in  some of  slides 
- scroll list divider
1. watch ionScroll to get realtime rolling(notice : use ngZone to change variable);
2. use scrollTo to collapse the list and scroll to the divider;
- hot-code-push 
1.  change the .chcpenv
```angularjs
{
  "content_url": "http://host:port",
  "config_url" : "http://host:port/chcp.json"
}
```
2. add the config.xml
```xml
<chcp>
    <config-file url="http://host:port/chcp.json" />
    <auto-download enabled="true" />
    <auto-install enabled="true" />
</chcp>
```
3. run the command
```sh
cordova-hcp build;
```
get the cordova-hcp.json
```json
{
  "name": "cloudMusic",
  "ios_identifier": "",
  "android_identifier": "",
  "update": "start",
  "content_url": "http://host:port"
}
```
4. copy www folder to the your host server;
