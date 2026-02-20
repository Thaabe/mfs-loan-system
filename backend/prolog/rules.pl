% Fully Approved
approve(Age, Emp, I, E, C, D, A, Period) :-
    Age >= 21,
    Emp = employed,
    C >= 700,
    Disposable is I - E,
    Disposable > 2000,
    D < 5000,
    A < I * 10,
    Period =< 60.

% Conditional Approval
conditional(Age, Emp, I, E, C, D, A, Period) :-
    Age >= 18,
    C >= 600,
    C < 700,
    Disposable is I - E,
    Disposable > 1000,
    Period =< 72.

% Rejection
reject(_, _, _, _, C, _, _, _) :-
    C < 600.

% Decision Logic
decision(Age, Emp, I, E, C, D, A, Period, approved) :-
    approve(Age, Emp, I, E, C, D, A, Period), !.

decision(Age, Emp, I, E, C, D, A, Period, conditional_approved) :-
    conditional(Age, Emp, I, E, C, D, A, Period), !.

decision(_, _, _, _, _, _, _, _, rejected).

% Wrapper to always output decision
decide(Age, Emp, I, E, C, D, A, Period) :-
    decision(Age, Emp, I, E, C, D, A, Period, Status),
    write(Status), !.
