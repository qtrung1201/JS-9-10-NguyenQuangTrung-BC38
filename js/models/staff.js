function Staff(staffAccount, fullName, email, password, startDate, salary, position, workingTime){
    this.staffAccount = staffAccount;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.startDate = startDate;
    this.salary = salary;
    this.position = position;
    this.workingTime = workingTime;
    this.calcSalary = function (){
        return this.salary*2;
    };
}
