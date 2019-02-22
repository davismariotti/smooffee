//
//  AppDelegate.swift
//  ArabicaTestApp
//
//  Created by Davis Mariotti on 2/20/19.
//  Copyright © 2019 Davis Mariotti. All rights reserved.
//
import Firebase
import UIKit
import Apollo

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    static var apollo = ApolloClient(url: URL(string: "http://localhost:9000/graphql")!)


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    static func reconfigureApollo(user: User) {
        user.getIDTokenForcingRefresh(true) {
            (idToken, error) in
            if let error = error {
                print(error)
                return
            }
            if let idToken = idToken {
                apollo = {
                    let configuration = URLSessionConfiguration.default
                    // Add additional headers as needed
                    configuration.httpAdditionalHeaders = ["Authorization": String.init(format: "Bearer %@", idToken)] // Replace `<token>`
                    
                    let url = URL(string: "http://localhost:9000/graphql")!
                    
                    return ApolloClient(networkTransport: HTTPNetworkTransport(url: url, configuration: configuration))
                }()
            }
        }
    }

}

