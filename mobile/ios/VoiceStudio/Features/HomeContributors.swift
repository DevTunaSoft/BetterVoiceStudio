import SwiftUI
import VoiceStudioKit

/// Product ownership is independent of the original project's core team.
/// Historical contributor attribution is preserved in legal notices.
enum HomeContributors {
    static let logins: [String] = []
    static let coreMaintainers: Set<String> = []
    static let repository = URL(string: "https://github.com/DevTunaSoft/VoiceBlueprint-Pro")!
}

struct ContributorCluster: View {
    @Environment(\.vsTheme) private var theme
    var body: some View {
        VStack(alignment: .trailing, spacing: 4) {
            Text("DevTunaSoft").font(.caption).foregroundStyle(theme.color("textMuted"))
                .accessibilityIdentifier("home.contributors.credit")
            Link("Project", destination: HomeContributors.repository)
                .frame(minHeight: 44)
                .accessibilityIdentifier("home.project-link")
        }.frame(width: 112)
    }
}
