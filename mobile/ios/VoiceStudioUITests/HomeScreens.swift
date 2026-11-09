import XCTest

final class HomeScreens: XCTestCase {
    @MainActor func testHomeStartsOfflineAndOpensEveryWorkspace() {
        let app = XCUIApplication(); app.launchArguments = ["--ui-smoke", "-AppleLanguages", "(en)"]
        app.launch(); app.declineConsent()
        XCTAssertTrue(app.navigationBars["Home"].waitForExistence(timeout: 5))
        let title = app.descendants(matching: .any)["navigation.title"].firstMatch
        XCTAssertTrue(title.exists)
        XCTAssertEqual(title.label, "Home")
        XCTAssertLessThan(title.frame.midX, app.frame.width / 2)
        XCTAssertTrue(app.staticTexts["VoiceBlueprint Pro"].exists)
        let attachment = XCTAttachment(screenshot: app.screenshot()); attachment.name = "Home-dark"; attachment.lifetime = .keepAlways; add(attachment)
        for (route, title) in [("speak","Speech"),("voices","Clone a voice"),("dub","Dub"),("dictate","Dictate"),("models","Models"),("connect","Connect to VoiceBlueprint Pro")] {
            let card = app.buttons["home."+route]
            app.reveal(card)
            XCTAssertTrue(card.isHittable, route); card.tap()
            XCTAssertTrue(app.navigationBars[title].waitForExistence(timeout: 5), route)
            if route == "voices" {
                app.buttons["Cancel"].tap()
                XCTAssertTrue(app.navigationBars[title].waitForNonExistence(timeout: 5))
                continue
            }
            // A Back tap during the push transition can be dropped; retry until Home shows,
            // and never tap again once it does (Home's first bar button is Projects).
            for _ in 0..<3 where !app.navigationBars["Home"].exists {
                if app.buttons["BackButton"].exists { app.buttons["BackButton"].tap() }
                else if app.navigationBars[title].exists { app.navigationBars[title].buttons.element(boundBy: 0).tap() }
                _ = app.navigationBars["Home"].waitForExistence(timeout: 3)
            }
            XCTAssertTrue(app.navigationBars["Home"].exists, "did not return Home from \(route)")
        }
        for _ in 0..<5 { if app.staticTexts["Your generations will appear here."].isHittable { break }; app.swipeUp() }
        XCTAssertTrue(app.staticTexts["Your generations will appear here."].exists)
        XCTAssertTrue(app.staticTexts["No projects yet"].exists)
        app.tabButton("Settings").tap()
        app.buttons["Mode"].tap(); app.buttons["choice.option.light"].tap()
        app.tabButton("Home").tap()
        app.reveal(app.buttons["home.speak"], swipingDown: true)
        let light = XCTAttachment(screenshot: app.screenshot()); light.name = "Home-light"; light.lifetime = .keepAlways; add(light)
        app.buttons["home.speak"].tap(); XCTAssertTrue(app.textViews["speak.text"].waitForExistence(timeout: 5))
    }
}

final class MaintainerCardScreens: XCTestCase {
    @MainActor func testHomeShowsForkOwnedDeveloperAndProjectLink() {
        let app = XCUIApplication()
        app.launchArguments = ["--ui-smoke", "-AppleLanguages", "(en)"]
        app.launch(); app.declineConsent()
        XCTAssertTrue(app.navigationBars["Home"].waitForExistence(timeout: 5))
        XCTAssertTrue(app.staticTexts["DevTunaSoft"].exists)
        let link = app.links["home.project-link"]
        XCTAssertTrue(link.exists)
        XCTAssertFalse(app.buttons["home.contributor.debpalash"].exists)
        XCTAssertFalse(app.buttons["home.contributor.velixio"].exists)
    }
}
