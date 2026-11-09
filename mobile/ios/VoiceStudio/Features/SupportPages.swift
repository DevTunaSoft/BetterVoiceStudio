import SwiftUI
import VoiceStudioKit

private let projectURL = URL(string: "https://github.com/DevTunaSoft/VoiceBlueprint-Pro")!

// Legacy route names remain for navigation compatibility, but the content
// and links now belong exclusively to the independent VoiceBlueprint Pro fork.
struct DonateView: View {
    @Environment(\.vsTheme) private var theme
    var body: some View {
        SupportPage(title: "VoiceBlueprint Pro") {
            Text("Design. Clone. Create.").font(.title2.weight(.semibold))
            Text("An independent, local-first AI voice production project developed by DevTunaSoft contributors.")
            Text("No official donations, sponsors, or payment accounts are available for this fork.")
                .foregroundStyle(theme.color("textMuted"))
            Link("VoiceBlueprint Pro on GitHub", destination: projectURL)
                .frame(minHeight: 44)
                .accessibilityIdentifier("support.project.github")
        }.accessibilityIdentifier("support.donate")
    }
}

struct ProView: View {
    @Environment(\.vsTheme) private var theme
    var body: some View {
        SupportPage(title: "VoiceBlueprint Pro licensing") {
            Text("VoiceBlueprint Pro does not sell the original project's Pro plans or commercial licences.")
            Text("Models, engines, and bundled components may have separate open-source licence terms.")
                .foregroundStyle(theme.color("textMuted"))
            Text("No paid VoiceBlueprint Pro checkout or subscription is offered.")
        }.accessibilityIdentifier("support.pro")
    }
}

struct OtherAppsView: View {
    var body: some View {
        SupportPage(title: "About VoiceBlueprint Pro") {
            Text("Developed independently by DevTunaSoft contributors.")
            Text("The original project's apps, sponsors, social accounts, and businesses are not affiliated with VoiceBlueprint Pro.")
            Text("Visit the VoiceBlueprint Pro GitHub repository for project information.")
        }.accessibilityIdentifier("support.other-apps")
    }
}

private struct SupportPage<Content: View>: View {
    let title: String
    @ViewBuilder let content: () -> Content
    @Environment(\.vsTheme) private var theme
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                Text(title).font(.title2.weight(.semibold)).accessibilityAddTraits(.isHeader)
                content()
            }.fixedSize(horizontal: false, vertical: true)
                .padding(16).frame(maxWidth: 600).frame(maxWidth: .infinity)
        }.foregroundStyle(theme.color("text"))
            .background(theme.color("canvas").ignoresSafeArea())
            .navigationTitle(title).navigationBarTitleDisplayMode(.inline)
    }
}
