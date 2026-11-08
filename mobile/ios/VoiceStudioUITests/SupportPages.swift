import XCTest

final class SupportPages: XCTestCase {
    @MainActor func testIndependentSupportPagesHaveNoUpstreamPayments() {
        let app = XCUIApplication()
        app.launchArguments = ["--ui-smoke", "-AppleLanguages", "(en)",
                               "-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXXXL"]
        app.launch(); app.declineConsent(); app.tabButton("Settings").tap()
        for route in ["donate", "pro", "other-apps"] {
            let entry = app.buttons["settings." + route]
            app.reveal(entry); XCTAssertTrue(entry.isHittable); entry.tap()
            if route == "donate" {
                let link = app.descendants(matching: .any).matching(identifier: "support.project.github").firstMatch
                app.reveal(link); XCTAssertTrue(link.isHittable)
                XCTAssertGreaterThanOrEqual(link.frame.height, 44)
                XCTAssertFalse(app.buttons["PayPal"].exists)
                XCTAssertFalse(app.buttons["Ko-fi"].exists)
            } else if route == "pro" {
                XCTAssertTrue(app.staticTexts["No paid VoiceBlueprint Pro checkout or subscription is offered."].exists)
                XCTAssertFalse(app.buttons["Buy Pro"].exists)
            } else {
                XCTAssertTrue(app.staticTexts["Developed independently by DevTunaSoft contributors."].exists)
                XCTAssertFalse(app.buttons["OpenGTM"].exists)
            }
            let image = XCTAttachment(screenshot: app.screenshot())
            image.name = "VoiceBlueprint-" + route; image.lifetime = .keepAlways; add(image)
            app.navigationBars.buttons.element(boundBy: 0).tap()
        }
    }
}
