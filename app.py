from flask import Flask, flash, redirect, render_template, url_for, request, session, logging
from flask_session import Session
from tempfile import mkdtemp
from passlib.hash import sha256_crypt
from flask_mysqldb import MySQL
from helpers import login_required, RegisterForm
 

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config['SECRET_KEY'] = '4e2ffdc78e2644a2af63c82d0d777943' 
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
   
# Configure mysql database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'user4dusk'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'dusk'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
#init MYSQL
mysql = MySQL(app)


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/webapp")
@login_required
def webapp():
    return render_template("app.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via post (as by submitting a form via POST)
    if request.method == "POST":
        username = request.form['username']
        password_candidate = request.form['password']

        # Create Cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        # Check to see if result returned a value
        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed, Remember which user has logged in
                session['logged_in'] = True
                session['username'] = username

                return redirect(url_for('webapp'))

            else:
                error = 'Password is incorrect'
                return render_template('login.html', error=error)

            # Close mysql connection
            cur.close()
        
        # result is empty, therefore username doesn't exist
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)

    return render_template('login.html')





@app.route("/signup", methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        city = form.city.data
        country = form.country.data
        password = sha256_crypt.encrypt(str(form.password.data))

        # Store data in SQL
        cur = mysql.connection.cursor()

        """Ensure the username and email hasn't be registered before"""
        # Query database for username
        result = cur.execute("SELECT username FROM users WHERE username = %s", [username])
        if result > 0:
            error = 'Username already in use'
            return render_template('register.html', error=error, form=form)

        # Query database for username
        result = cur.execute("SELECT email FROM users WHERE email = %s", [email])
        if result > 0:
            error = 'Email already in use'
            return render_template('register.html', error=error, form=form)

        # Insert the data provided by the new user
        cur.execute("INSERT INTO users(name, email, username, city, country, password) VALUES(%s, %s, %s, %s, %s, %s)", (name, email, username, city, country, password))

        #commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('You are now registered', 'success')

        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/logout')
@login_required
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('/'))

if __name__ == '__main__':
    app.run(debug=True)