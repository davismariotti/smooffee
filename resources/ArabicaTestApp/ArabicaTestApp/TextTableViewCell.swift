//
//  TextTableViewCell.swift
//  ArabicaTestApp
//
//  Created by Davis Mariotti on 2/21/19.
//  Copyright © 2019 Davis Mariotti. All rights reserved.
//

import UIKit

class TextTableViewCell: UITableViewCell {

    @IBOutlet weak var label: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
