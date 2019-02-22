//  This file was automatically generated and should not be edited.

import Apollo

public struct UserInput: GraphQLMapConvertible {
  public var graphQLMap: GraphQLMap

  public init(firstName: String, lastName: String, email: String, organizationId: String) {
    graphQLMap = ["firstName": firstName, "lastName": lastName, "email": email, "organizationId": organizationId]
  }

  public var firstName: String {
    get {
      return graphQLMap["firstName"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "firstName")
    }
  }

  public var lastName: String {
    get {
      return graphQLMap["lastName"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "lastName")
    }
  }

  public var email: String {
    get {
      return graphQLMap["email"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "email")
    }
  }

  public var organizationId: String {
    get {
      return graphQLMap["organizationId"] as! String
    }
    set {
      graphQLMap.updateValue(newValue, forKey: "organizationId")
    }
  }
}

public final class AuthCreateUserTestQuery: GraphQLQuery {
  public let operationDefinition =
    "query AuthCreateUserTest($userInput: UserInput!) {\n  auth {\n    __typename\n    createUser(userInput: $userInput)\n  }\n}"

  public var userInput: UserInput

  public init(userInput: UserInput) {
    self.userInput = userInput
  }

  public var variables: GraphQLMap? {
    return ["userInput": userInput]
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("auth", type: .nonNull(.object(Auth.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(auth: Auth) {
      self.init(unsafeResultMap: ["__typename": "Query", "auth": auth.resultMap])
    }

    public var auth: Auth {
      get {
        return Auth(unsafeResultMap: resultMap["auth"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "auth")
      }
    }

    public struct Auth: GraphQLSelectionSet {
      public static let possibleTypes = ["AuthQuery"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("createUser", arguments: ["userInput": GraphQLVariable("userInput")], type: .nonNull(.scalar(String.self))),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(createUser: String) {
        self.init(unsafeResultMap: ["__typename": "AuthQuery", "createUser": createUser])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var createUser: String {
        get {
          return resultMap["createUser"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "createUser")
        }
      }
    }
  }
}

public final class CurrentUserQuery: GraphQLQuery {
  public let operationDefinition =
    "query CurrentUser {\n  user {\n    __typename\n    currentUser\n  }\n}"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes = ["Query"]

    public static let selections: [GraphQLSelection] = [
      GraphQLField("user", type: .nonNull(.object(User.selections))),
    ]

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(user: User) {
      self.init(unsafeResultMap: ["__typename": "Query", "user": user.resultMap])
    }

    public var user: User {
      get {
        return User(unsafeResultMap: resultMap["user"]! as! ResultMap)
      }
      set {
        resultMap.updateValue(newValue.resultMap, forKey: "user")
      }
    }

    public struct User: GraphQLSelectionSet {
      public static let possibleTypes = ["UserQuery"]

      public static let selections: [GraphQLSelection] = [
        GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
        GraphQLField("currentUser", type: .scalar(String.self)),
      ]

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(currentUser: String? = nil) {
        self.init(unsafeResultMap: ["__typename": "UserQuery", "currentUser": currentUser])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var currentUser: String? {
        get {
          return resultMap["currentUser"] as? String
        }
        set {
          resultMap.updateValue(newValue, forKey: "currentUser")
        }
      }
    }
  }
}