﻿global using Serilog.Sinks.SystemConsole.Themes;
global using System.Data;
global using Dapper;
global using Microsoft.Data.SqlClient;
global using System.Text.Json;
global using MailKit.Net.Smtp;
global using MailKit.Security;
global using MimeKit;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.AspNetCore.Identity;
global using System.ComponentModel.DataAnnotations;
global using Microsoft.AspNetCore.Http;
global using Microsoft.Extensions.Options;
global using System.Security.Claims;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Builder;
global using Microsoft.AspNetCore.Hosting;
global using Microsoft.Extensions.Hosting;
global using System.Collections;
global using SendGrid.Helpers.Mail;
global using Duende.IdentityServer.EntityFramework.Entities;
global using Microsoft.Extensions.Configuration;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using System.Linq.Expressions;
global using Microsoft.EntityFrameworkCore.Query;
global using System.ComponentModel.DataAnnotations.Schema;
global using Microsoft.AspNetCore.Mvc.ModelBinding;
global using Microsoft.AspNetCore.Diagnostics;
global using System.Net;
global using Microsoft.EntityFrameworkCore.Metadata;
global using infra.Data;
global using Duende.IdentityServer.EntityFramework.Options;
global using Microsoft.Extensions.Logging;
global using infra.Email.Api;
global using infra.Email.Smtp;
global using Microsoft.AspNetCore.Authentication;
global using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
global using infra.ViewModels;
global using infra.Models.error;
global using System.Globalization;
global using infra.Models;
global using infra.Models.infra;
global using SendGrid;
global using Newtonsoft.Json;
global using Duende.IdentityServer.Extensions;
global using Duende.IdentityServer.Models;
global using Duende.IdentityServer.Services;
global using IdentityModel;
global using Serilog.Context;
global using System;
global using Serilog.Core;
global using Serilog.Formatting.Compact;
global using Serilog.Sinks.MariaDB.Extensions;
global using Serilog.Sinks.MariaDB;
global using System.IO.Compression;
global using Microsoft.AspNetCore.ResponseCompression;
global using Microsoft.IdentityModel.Logging;
global using infra.Repo;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using System.Security.Cryptography.X509Certificates;
global using Microsoft.IdentityModel.Tokens;
global using System.IdentityModel.Tokens.Jwt;
global using Duende.IdentityServer.Configuration;
global using infra.Specafication;
global using infra.Specification;
global using Microsoft.EntityFrameworkCore.Migrations;
global using Microsoft.EntityFrameworkCore.Infrastructure;
global using Serilog;
global using AutoMapper;
global using infra.AutoMapar;
global using Microsoft.AspNetCore.HttpsPolicy;
global using Microsoft.AspNetCore.Mvc.Authorization;
global using infra.Models.error.MiddleWare;
global using Microsoft.AspNetCore.HttpOverrides;
global using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
