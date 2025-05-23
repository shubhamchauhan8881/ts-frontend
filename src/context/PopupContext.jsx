import React, { useState, createContext, useContext, useCallback } from "react";
import { XmarkIcon } from "../assets/icons";

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [popupContent, setPopupContent] = useState(null);
    // const [modalTitle, setModalTitle] = useState(null)

	const openPopup = useCallback((content, title) => {
		setPopupContent(content);
        // setModalTitle(title);
		setIsPopupOpen(true);
	}, []);

	const closePopup = useCallback(() => {
		setIsPopupOpen(false);
		setPopupContent(null);
        // setModalTitle(null);
	}, []);

	const contextValue = {
		openPopup,
		closePopup,
	};

	return (
		<PopupContext.Provider value={contextValue}>
			{children}
			{isPopupOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/50 p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modalTitle"
				>
					<div className="rounded-lg bg-base-300 p-4 shadow-lg relative">
						
							<button
                                onClick={closePopup}
								type="button"
								className="absolute top-2 right-2 btn btn-circle btn-ghost hover:btn-error btn-sm"
								aria-label="Close"
							>
								<XmarkIcon size={6} />
							</button>
								{popupContent}

						{/* <div className="mt-6 flex justify-end gap-2">
							<button
								type="button"
								className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
							>
								Cancel
							</button>

							<button
								type="button"
								className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
							>
								Done
							</button>
						</div> */}
					</div>
				</div>
			)}
		</PopupContext.Provider>
	);
};

const usePopup = () => {
	const context = useContext(PopupContext);
	if (!context) {
		throw new Error("usePopup must be used within a PopupProvider");
	}
	return context;
};

export { PopupProvider, usePopup };
