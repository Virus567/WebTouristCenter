﻿using RestPanda;

var server = new PandaServer("http://localhost:8082/", typeof(Program));
server.Start();
Console.WriteLine("Server started");
Console.Read();
server.Stop();