
import { IPaste, View } from "./MainContent";
import { PasteView } from "./PasteView";



interface ViewPastesPageProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  pasteArray: IPaste[];
  getRecentPastes: () => void;
  handleViewPasteComments: (clickedPasteId: string) => void;
}

export function ViewPastesPage({view, setView, pasteArray, getRecentPastes, handleViewPasteComments}: ViewPastesPageProps): JSX.Element {
  
  


    return (
    <div className="ctn-paste">
    {pasteArray.map((paste, index) => {
      return (
        <PasteView
          handleViewPasteComments={handleViewPasteComments}
          paste={paste}
          key={paste.id}
          getRecentPastes={getRecentPastes}
        />
      );
    })}
  </div>
    )

  }

