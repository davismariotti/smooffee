import UIKit
import Firebase
import FirebaseUI
import Apollo

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    

    @IBOutlet weak var createAccountBtn: UIButton!
    @IBOutlet weak var loginBtn: UIButton!
    @IBOutlet weak var tableView: UITableView!
    
    let identifier = "kTextTableViewCell"
    
    var handle: AuthStateDidChangeListenerHandle?
    var auth: FUIAuth?
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        handle = Auth.auth().addStateDidChangeListener { (auth, user) in
            self.tableView.reloadData()
            if let user = user {
                AppDelegate.reconfigureApollo(user: user)
            }
        }
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        Auth.auth().removeStateDidChangeListener(handle!)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tableView.delegate = self
        self.tableView.dataSource = self
        self.tableView.register(UINib(nibName: "TextTableViewCell", bundle: nil), forCellReuseIdentifier: identifier)
    }

    @IBAction func createAccount(_ sender: UIButton) {
        let email = "davismariotti@gmail.com"
        let password = "Thisisatest!"
        Auth.auth().createUser(withEmail: email, password: password) { (authResult, error) in
            if let error = error {
                print(error)
                return
            }
            if let authResult = authResult {
                authResult.user.getIDToken { (idToken, error) in
                    if let error = error {
                        print(error)
                        return
                    }
                    if let idToken = idToken {
                        print(idToken)
                        let userInput = UserInput(firstName: "Davis", lastName: "Mariotti", email: authResult.user.email!, organizationId: "3")
                        
                        let query = AuthCreateUserTestQuery(userInput: userInput)
                        
                        AppDelegate.apollo.fetch(query: query, cachePolicy: .fetchIgnoringCacheData) { (result, error) in
                            print(result?.data?.auth.createUser as Any)
                        }
                    }
                }
            }
        }
    }
    
    @IBAction func loginBtnPressed(_ sender: Any) {
        let email = "davismariotti@gmail.com"
        let password = "Thisisatest!"
        Auth.auth().signIn(withEmail: email, password: password) { [weak self] user, error in
            guard self != nil else { return }
            print(user as Any)
            print(error as Any)
            user?.user.getIDTokenForcingRefresh(true) {
                (idToken, error) in
                if let error = error {
                    print(error)
                    return;
                }
                if let idToken = idToken {
                    print(idToken)
                    let query = CurrentUserQuery()
                    
                    AppDelegate.apollo.fetch(query: query, cachePolicy: .fetchIgnoringCacheData) { (result, error) in
                        print(result?.data?.user.currentUser as Any)
                    }
                }
            }
        }
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 5
    }
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell: TextTableViewCell = tableView.dequeueReusableCell(withIdentifier: identifier) as! TextTableViewCell
        
        let user = Auth.auth().currentUser
        if let user = user {
            switch (indexPath.row) {
                case 0:
                    cell.label.text = user.displayName
                case 1:
                    cell.label.text = user.email
                case 2:
                    cell.label.text = user.uid
                case 3:
                    cell.label.text = user.refreshToken
                case 4:
                    cell.label.text = user.providerID
                default:
                    cell.label.text = ""
            }
        }
            
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80
    }
    
    
}

