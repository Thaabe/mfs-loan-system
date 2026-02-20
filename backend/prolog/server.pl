:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).

:- consult('rules.pl').

:- set_setting(http:cors, [*]).

:- http_handler(root(api/applications), handle_application, [method(post)]).

start_server :-
    http_server(http_dispatch, [port(5000)]).

handle_application(Request) :-
    cors_enable(Request, [methods([post])]),
    http_read_json_dict(Request, Data),

    Age is Data.age,
    atom_string(Emp, Data.employment),
    I is Data.income,
    E is Data.expenses,
    C is Data.credit,
    D is Data.debt,
    A is Data.amount,
    Period is Data.period,

    decision(Age, Emp, I, E, C, D, A, Period, Status),

    reply_json_dict(_{decision: Status}).
